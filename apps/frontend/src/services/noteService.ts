import { API_BASE_URL } from '../config';

export interface Note {
    id: string;
    userId: string;
    deckId: string;
    content: { front: string; back: string };
}

export interface Card {
    id: string;
    front: string;
    back: string;
    due: string;
}

export const createNote = async (deckId: string, front: string, back: string, noteType: string = 'BASIC') => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ deckId, front, back, noteType })
    });
    if (!response.ok) throw new Error('Failed to create note');
    return response.json();
};

export const getDueCards = async (deckId: string, forceAll: boolean = false): Promise<Card[]> => {
    const token = localStorage.getItem('token');
    const url = `${API_BASE_URL}/api/decks/${deckId}/due${forceAll ? '?type=all' : ''}`;
    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch due cards');
    return response.json();
};

export const getAllDueCards = async (): Promise<Card[]> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/cards/due`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch all due cards');
    return response.json();
};

export const answerCard = async (cardId: string, grade: number) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/cards/${cardId}/answer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ grade })
    });
    if (!response.ok) throw new Error('Failed to answer card');
    return response.json();
};
