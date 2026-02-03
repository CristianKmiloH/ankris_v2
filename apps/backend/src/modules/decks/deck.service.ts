import { prisma } from '../../db/prisma';
import { deleteCardsByDeckId } from '../cards/card.service';

// Interface matching Prisma Deck model structure relative to what frontend expects
// (Prisma returns Dates as Date objects, which matches our need)

export const createDeck = async (userId: string, name: string, description?: string, parentId?: string) => {
    return await prisma.deck.create({
        data: {
            userId,
            name,
            description,
            parentId
        }
    });
};

export const getDecks = async (userId: string) => {
    const decks = await prisma.deck.findMany({
        where: { userId },
        include: {
            _count: {
                select: { cards: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
    return decks;
};

export const getDeckById = async (userId: string, deckId: string) => {
    return await prisma.deck.findFirst({
        where: {
            id: deckId,
            userId
        }
    });
};

export const deleteDeck = async (userId: string, deckId: string) => {
    console.log(`[SERVICE] Attempting DELETE deckId: ${deckId} for userId: ${userId}`);

    // Check ownership
    const deck = await prisma.deck.findFirst({
        where: { id: deckId, userId }
    });

    if (!deck) return false;

    // Transactional delete to ensure consistency (although Cascade delete in Prisma schema handles this usually,
    // explicitly calling deleteCardsByDeckId for safety if not defined in schema yet)

    // Note: If schema has onDelete: Cascade, we don't need manual card deletion.
    // Based on previous schema viewing, relations were simple. 
    // Let's keep manual card deletion logic via service to be safe and consistent with logic.
    await deleteCardsByDeckId(deckId);

    // FIXED: Manually delete related Notes to avoid Foreign Key Constraint Violation (Note -> Deck)
    // Since schema doesn't have onDelete: Cascade for Notes yet, we must do it here.
    await prisma.note.deleteMany({
        where: { deckId }
    });

    await prisma.deck.delete({
        where: { id: deckId }
    });

    return true;
};

export const updateDeck = async (userId: string, deckId: string, name: string, description?: string) => {
    const deck = await prisma.deck.findFirst({
        where: { id: deckId, userId }
    });

    if (!deck) return null;

    return await prisma.deck.update({
        where: { id: deckId },
        data: {
            name,
            description,
            updatedAt: new Date()
        }
    });
};
