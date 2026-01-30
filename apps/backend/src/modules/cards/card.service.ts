import fs from 'fs';
import path from 'path';
import { FSRSScheduler } from '../fsrs/scheduler';

// PERSISTENT STORE
const BACKEND_ROOT = path.resolve(__dirname, '../../../');
const DATA_DIR = path.join(BACKEND_ROOT, 'data');
const CARDS_FILE = path.join(DATA_DIR, 'cards.json');

const loadCards = (): Card[] => {
    if (!fs.existsSync(CARDS_FILE)) return [];
    try {
        const data = JSON.parse(fs.readFileSync(CARDS_FILE, 'utf-8'));
        // Restore Date objects
        return data.map((c: any) => ({
            ...c,
            lastReview: c.lastReview ? new Date(c.lastReview) : undefined,
            due: new Date(c.due)
        }));
    } catch { return []; }
};

const saveCards = (cards: Card[]) => {
    try {
        if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
        fs.writeFileSync(CARDS_FILE, JSON.stringify(cards, null, 2));
    } catch (e) {
        console.error("Failed to save cards", e);
    }
};

export interface Card {
    id: string;
    userId: string;
    deckId: string;
    noteId: string;
    ord: number; // Added for Anki template/card type identification
    front: string;
    back: string;
    lastReview?: Date; // For accurate FSRS elapsed time
    due: Date;
    state: number; // 0=New, 1=Learning, 2=Review, 3=Relearning
    stability: number;
    difficulty: number;
    elapsedDays: number;
    reps: number;
}

const scheduler = new FSRSScheduler();

export const createCard = (userId: string, deckId: string, noteId: string, front: string, back: string, ord: number = 0) => {
    const cards = loadCards();
    const newCard: Card = {
        id: Math.random().toString(36).substring(7),
        userId,
        deckId,
        noteId,
        ord,
        front,
        back,
        due: new Date(), // Due immediately
        lastReview: undefined, // Explicitly undefined for new cards
        state: 0,
        stability: 0, // Initial stability
        difficulty: 0, // Initial difficulty
        elapsedDays: 0,
        reps: 0
    };
    cards.push(newCard);
    saveCards(cards);
    return newCard;
};

export const getAllCards = async (userId: string) => {
    const cards = loadCards();
    return cards.filter(c => c.userId === userId);
};

export const countCardsByDeckId = (deckId: string) => {
    const cards = loadCards();
    return cards.filter(c => c.deckId === deckId).length;
};


export const getDueCards = async (userId: string, deckId: string) => {
    const cards = loadCards();
    const now = new Date();
    return cards.filter(c => c.userId === userId && c.deckId === deckId && c.due <= now);
};

export const getCardsForStudy = async (userId: string, deckId: string) => {
    const cards = loadCards();
    // Return ALL cards for the deck, sorted by Due Date (Overdue first)
    return cards
        .filter(c => c.userId === userId && c.deckId === deckId)
        .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime());
};

export const answerCard = async (userId: string, cardId: string, grade: number) => {
    const cards = loadCards();
    const cardIndex = cards.findIndex(c => c.id === cardId && c.userId === userId);

    if (cardIndex === -1) throw new Error('Card not found');
    const card = cards[cardIndex];

    const now = new Date();
    // Calculate actual elapsed days since last review
    const lastReview = card.lastReview ? new Date(card.lastReview) : new Date(card.due); // Fallback
    const diffTime = Math.abs(now.getTime() - lastReview.getTime());
    const actualElapsedDays = diffTime / (1000 * 60 * 60 * 24);

    // Calculate FSRS parameters
    const result = scheduler.calculateNextState(card.difficulty, card.stability, grade, actualElapsedDays || 0.01);

    // Update Difficulty and Stability (always using FSRS logic)
    card.difficulty = result.d;
    card.stability = result.s;
    const fsrsInterval = result.interval;

    // Update Last Review
    card.lastReview = now;

    // determine next Due Date using LEARNING STEPS for young cards
    const nextDue = new Date();
    let computedInterval = fsrsInterval;

    // Learning Phase Logic (State 0=New, 1=Learning)
    // If card is new/learning and not 'Easy', use short steps
    if ((card.state === 0 || card.state === 1) && grade < 4) {
        if (grade === 1) {
            // Again: 1 minute
            nextDue.setTime(nextDue.getTime() + 1 * 60 * 1000);
            computedInterval = 0;
            card.state = 1; // Stay/Enter Learning
        } else if (grade === 2) {
            // Hard: 6 minutes
            nextDue.setTime(nextDue.getTime() + 6 * 60 * 1000);
            computedInterval = 0;
            card.state = 1; // Stay in Learning
        } else if (grade === 3) {
            // Good: 10 minutes (Learning Step)
            // If already in learning for a while, maybe graduate? keeping simple: 10m first step
            if (card.reps > 1) {
                // Graduate to 1 day if it's the second 'Good'
                nextDue.setDate(nextDue.getDate() + 1);
                computedInterval = 1;
                card.state = 2; // Review
            } else {
                nextDue.setTime(nextDue.getTime() + 10 * 60 * 1000);
                computedInterval = 0;
                card.state = 1; // Stay in learning
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
        card.state = 2; // Review
    }

    // Fallback/Override based on FSRS interval if it was extremely short and we didn't catch it above
    // (Logic handled above, but keeping robust structure)

    card.due = nextDue;
    card.reps += 1;
    // card.state is now set within the learning/review logic above

    // Save changes
    cards[cardIndex] = card;
    saveCards(cards);

    // Log review (Mock)
    console.log(`[FSRS] Card ${card.id} answered ${grade}. Next due: ${card.due}, Interval: ${computedInterval}`);

    return card;
};

export const updateCard = async (userId: string, cardId: string, updates: Partial<Card>) => {
    const cards = loadCards();
    const cardIndex = cards.findIndex(c => c.id === cardId && c.userId === userId);
    if (cardIndex === -1) throw new Error('Card not found');

    const updatedCard = { ...cards[cardIndex], ...updates };
    cards[cardIndex] = updatedCard;
    saveCards(cards);
    return updatedCard;
};

export const deleteCard = async (userId: string, cardId: string) => {
    const cards = loadCards();
    const cardIndex = cards.findIndex(c => c.id === cardId && c.userId === userId);
    if (cardIndex === -1) throw new Error('Card not found');

    cards.splice(cardIndex, 1);
    saveCards(cards);
};



export const deleteCardsByDeckId = (deckId: string) => {
    const cards = loadCards();
    const filteredCards = cards.filter(c => c.deckId !== deckId);
    if (cards.length !== filteredCards.length) {
        saveCards(filteredCards);
        console.log(`[SERVICE] Deleted ${cards.length - filteredCards.length} cards for deckId: ${deckId}`);
    }
};
