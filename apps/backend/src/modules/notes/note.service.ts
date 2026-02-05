import { prisma } from '../../db/prisma';
import { createCard } from '../cards/card.service';
import { NoteTypeRegistry } from './NoteTypeRegistry';

export const createNote = async (
    userId: string,
    deckId: string,
    front: string,
    back: string,
    noteType: string = 'BASIC',
    extraFields: Record<string, string> = {}
) => {
    // 1. Create Note in DB
    const note = await prisma.note.create({
        data: {
            userId,
            deckId,
            content: JSON.stringify({ front, back, ...extraFields }), // Store full content including extra fields (like 'Add Reverse' or 'Extra')
            noteType: noteType,
        }
    });

    // 2. Generate Cards based on Note Type Strategy
    const registry = NoteTypeRegistry.getInstance();
    const strategy = registry.get(noteType) || registry.get('BASIC')!; // Fallback to BASIC if type found

    // Prepare fields for the strategy
    // Strategies expect keys like 'Front', 'Back', 'Text', 'Extra', 'Add Reverse'
    // We map our simplified args to these expected keys
    const fields: Record<string, string> = {
        'Front': front,
        'Back': back,
        'Text': front, // Alias for Cloze
        'Extra': back, // Alias for Cloze/Extra
        ...extraFields
    };

    // Generate the card contents (1 or more cards)
    const generatedCards = strategy.generateCards(fields);

    // 3. Persist generated cards
    const createdCards = [];
    for (const genCard of generatedCards) {
        const card = await createCard(
            userId,
            deckId,
            note.id,
            genCard.front,
            genCard.back,
            genCard.ord
        );
        createdCards.push(card);
    }

    return { note, cards: createdCards };
};
