import * as CardService from '../cards/card.service';

interface Note {
    id: string;
    userId: string;
    deckId: string;
    content: { front: string; back: string };
}

const notes: Note[] = [];

export const createNote = async (userId: string, deckId: string, front: string, back: string) => {
    const note: Note = {
        id: Math.random().toString(36).substring(7),
        userId,
        deckId,
        content: { front, back }
    };
    notes.push(note);

    // Generate Card (Basic Type = 1 Card)
    const card = CardService.createCard(userId, deckId, note.id, front, back);

    return { note, card };
};
