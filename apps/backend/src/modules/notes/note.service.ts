import { prisma } from '../../db/prisma';

export const createNote = async (userId: string, deckId: string, front: string, back: string) => {
    // 1. Create Note in DB
    const note = await prisma.note.create({
        data: {
            userId,
            deckId,
            content: { front, back }, // Store JSON content
            noteType: 'BASIC', // Defaulting to BASIC for now, passed arg is better if available
        }
    });

    // 2. Generate Card linked to the Note
    // Basic Type = 1 Card
    const card = await CardService.createCard(userId, deckId, note.id, front, back);

    return { note, card };
};
