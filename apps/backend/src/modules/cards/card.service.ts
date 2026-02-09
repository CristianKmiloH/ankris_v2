import { prisma } from '../../db/prisma';
import { FSRSScheduler } from '../fsrs/scheduler';

// Interface matching Prisma Card model structure relative to what frontend expects
// (Prisma returns Dates as Date objects, which matches our need)

export interface Card {
    id: string;
    userId: string;
    deckId: string;
    noteId: string;
    ord: number; // Added for Anki template/card type identification
    front: string;
    back: string;
    lastReview: Date | null; // Prisma can return null
    due: Date;
    state: number; // 0=New, 1=Learning, 2=Review, 3=Relearning
    isFavorite: boolean;
    stability: number;
    difficulty: number;
    elapsedDays: number;
    reps: number;
}

const scheduler = new FSRSScheduler();

export const createCard = async (userId: string, deckId: string, noteId: string, front: string, back: string, ord: number = 0) => {
    return await prisma.card.create({
        data: {
            userId,
            deckId,
            noteId,
            ord,
            front,
            back,
            due: new Date(), // Due immediately
            lastReview: null, // Explicitly null for new cards
            state: 0,
            stability: 0, // Initial stability
            difficulty: 0, // Initial difficulty
            elapsedDays: 0,
            reps: 0
        }
    });
};

export const getAllCards = async (userId: string) => {
    return await prisma.card.findMany({
        where: { userId }
    });
};

export const countCardsByDeckId = async (deckId: string) => {
    return await prisma.card.count({
        where: { deckId }
    });
};


export const getDueCards = async (userId: string, deckId: string) => {
    const now = new Date();
    return await prisma.card.findMany({
        where: {
            userId,
            deckId,
            due: { lte: now }
        }
    });
};

export const getCardsForStudy = async (userId: string, deckId: string) => {
    // Return ALL cards for the deck, sorted by Due Date (Overdue first)
    return await prisma.card.findMany({
        where: {
            userId,
            deckId
        },
        orderBy: {
            due: 'asc'
        }
    });
};

export const getFavoriteCards = async (userId: string, deckId?: string) => {
    const where: any = { userId, isFavorite: true };
    if (deckId && deckId !== 'all') {
        where.deckId = deckId;
    }

    return await prisma.card.findMany({
        where,
        orderBy: { due: 'asc' }
    });
};

export const getCardsByIds = async (userId: string, cardIds: string[]) => {
    return await prisma.card.findMany({
        where: {
            userId,
            id: { in: cardIds }
        }
    });
};

export const answerCard = async (userId: string, cardId: string, grade: number) => {
    const card = await prisma.card.findFirst({
        where: { id: cardId, userId }
    });

    if (!card) throw new Error('Card not found');

    const now = new Date();
    // Calculate actual elapsed days since last review
    const lastReview = card.lastReview ? new Date(card.lastReview) : new Date(card.due); // Fallback
    const diffTime = Math.abs(now.getTime() - lastReview.getTime());
    const actualElapsedDays = diffTime / (1000 * 60 * 60 * 24);

    // Calculate FSRS parameters
    const result = scheduler.calculateNextState(card.difficulty, card.stability, grade, actualElapsedDays || 0.01);

    // Update Difficulty and Stability (always using FSRS logic)
    // We modify local variables to calculate nextDue, then update DB
    let newDifficulty = result.d;
    let newStability = result.s;
    const fsrsInterval = result.interval;

    // determine next Due Date using LEARNING STEPS for young cards
    const nextDue = new Date();
    let computedInterval = fsrsInterval;
    let newState = card.state;

    // Learning Phase Logic (State 0=New, 1=Learning)
    // If card is new/learning and not 'Easy', use short steps
    if ((card.state === 0 || card.state === 1) && grade < 4) {
        if (grade === 1) {
            // Again: 1 minute
            nextDue.setTime(nextDue.getTime() + 1 * 60 * 1000);
            computedInterval = 0;
            newState = 1; // Stay/Enter Learning
        } else if (grade === 2) {
            // Hard: 6 minutes
            nextDue.setTime(nextDue.getTime() + 6 * 60 * 1000);
            computedInterval = 0;
            newState = 1; // Stay in Learning
        } else if (grade === 3) {
            // Good: 10 minutes (Learning Step)
            // If already in learning for a while, maybe graduate? keeping simple: 10m first step
            if (card.reps > 1) {
                // Graduate to 1 day if it's the second 'Good'
                nextDue.setDate(nextDue.getDate() + 1);
                computedInterval = 1;
                newState = 2; // Review
            } else {
                nextDue.setTime(nextDue.getTime() + 10 * 60 * 1000);
                computedInterval = 0;
                newState = 1; // Stay in learning
            }
        }
    } else {
        // Review Phase or Easy
        if (fsrsInterval < 1) {
            // Intra-day review logic for review cards? Rare but possible with low stability
            nextDue.setTime(nextDue.getTime() + Math.max(1, fsrsInterval * 24 * 60) * 60 * 1000);
        } else {
            nextDue.setDate(nextDue.getDate() + Math.round(fsrsInterval));
        }
        newState = 2; // Review
    }

    // Update DB
    const updatedCard = await prisma.card.update({
        where: { id: cardId },
        data: {
            difficulty: newDifficulty,
            stability: newStability,
            lastReview: now,
            due: nextDue,
            reps: { increment: 1 },
            state: newState,
            updatedAt: new Date()
        }
    });

    // Create Review Log
    await prisma.reviewLog.create({
        data: {
            userId,
            cardId,
            grade,
            state: card.state, // State BEFORE review
            reviewTime: Math.floor(Math.random() * 5000) + 1000, // Mock duration for now (1-6s) as frontend doesn't send it yet
            scheduledDays: card.scheduledDays || 0,
            elapsedDays: Math.floor(actualElapsedDays),
            reviewDate: now
        }
    });

    // Log review (Console)
    console.log(`[FSRS] Card ${card.id} answered ${grade}. Logged to history.`);

    return updatedCard;
};

export const updateCard = async (userId: string, cardId: string, updates: Partial<Card>) => {
    const card = await prisma.card.findFirst({
        where: { id: cardId, userId }
    });

    if (!card) throw new Error('Card not found');

    // Remove immutable/undefined fields from updates if necessary
    // Prisma will ignore properties not in valid update input usually, but good to be safe if 'updates' has extra stuff.
    // For now, passing updates provided they match schema keys.
    // Note: 'updates' comes from partial Card interface which might mismatch exact Prisma UpdateInput slightly (e.g. null vs undefined).

    return await prisma.card.update({
        where: { id: cardId },
        data: {
            ...updates,
            updatedAt: new Date()
        }
    });
};

export const deleteCard = async (userId: string, cardId: string) => {
    // Check ownership
    const card = await prisma.card.findFirst({
        where: { id: cardId, userId }
    });

    if (!card) throw new Error('Card not found');

    await prisma.card.delete({
        where: { id: cardId }
    });
};

export const deleteCardsByDeckId = async (deckId: string) => {
    const { count } = await prisma.card.deleteMany({
        where: { deckId }
    });
    console.log(`[SERVICE] Deleted ${count} cards for deckId: ${deckId}`);
};

export const toggleFavorite = async (userId: string, cardId: string) => {
    const card = await prisma.card.findFirst({
        where: { id: cardId, userId }
    });

    if (!card) throw new Error('Card not found');

    return await prisma.card.update({
        where: { id: cardId },
        data: {
            isFavorite: !card.isFavorite,
            updatedAt: new Date()
        }
    });
};
