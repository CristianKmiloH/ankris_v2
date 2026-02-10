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
        orderBy: [
            { orderIndex: 'asc' },
            { createdAt: 'desc' }
        ]
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

export const toggleFavorite = async (userId: string, deckId: string, isFavorite: boolean) => {
    return await prisma.deck.update({
        where: { id: deckId },
        data: { isFavorite }
    });
};

export const reorderDeck = async (userId: string, deckId: string, direction: 'up' | 'down') => {
    // 1. Get all decks for user, ordered by orderIndex ASC, then createdAt DESC (stable sort)
    const decks = await prisma.deck.findMany({
        where: { userId },
        orderBy: [
            { orderIndex: 'asc' },
            { createdAt: 'desc' }
        ]
    });

    const currentIndex = decks.findIndex(d => d.id === deckId);
    if (currentIndex === -1) return null;

    // 2. Determine target index
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;

    // Boundary checks
    if (targetIndex < 0 || targetIndex >= decks.length) return decks; // No change needed

    // 3. Swap logic with Normalization
    // We re-assign orderIndex for ALL decks to ensure they are clean integers 0..N
    // Then we just swap the indices of current and target in the array

    // Swap in array
    const temp = decks[currentIndex];
    decks[currentIndex] = decks[targetIndex];
    decks[targetIndex] = temp;

    // 4. Update all relevant decks in DB (using valid transaction would be best, but Promise.all is okay for now)
    // Optimization: only update the two swapped decks IF the list was already normalized.
    // However, fast normalization is safer. Let's precise-update for performance if possible, 
    // but to fix "all 0" legacy data, strictly setting based on new array position is robust.

    const updatePromises = decks.map((deck, index) =>
        prisma.deck.update({
            where: { id: deck.id },
            data: { orderIndex: index }
        })
    );

    await Promise.all(updatePromises);

    return decks;
};

export const updateDeckOrder = async (userId: string, deckIds: string[]) => {
    // Validate ownership of all decks first? 
    // Or just try to update where userId matches.
    // Efficient approach: Transaction

    // We only update decks that belong to the user
    // To be safe, we can use a transaction or Promise.all

    // Security check: ensure all deckIds belong to user? 
    // If not, we just ignore the bad ones or update the ones we found.
    // Simpler: Just update where id=deckId AND userId=userId.

    const updatePromises = deckIds.map((id, index) =>
        prisma.deck.updateMany({
            where: { id, userId },
            data: { orderIndex: index }
        })
    );

    await Promise.all(updatePromises);

    return true;
};
