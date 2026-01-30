import { API_BASE_URL } from '../config';

export interface Deck {
    id: string;
    name: string;
    description?: string;
    _count: {
        cards: number;
    };
}

export const getDecks = async (): Promise<Deck[]> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/decks`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch decks');
    return response.json();
};

export const createDeck = async (name: string, description?: string): Promise<Deck> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/decks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, description })
    });
    if (!response.ok) throw new Error('Failed to create deck');
    return response.json();
};

export const deleteDeck = async (id: string): Promise<void> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/decks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to delete deck');
};

export const importDeck = async (file: File): Promise<any> => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/import/anki`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(err.error || 'Failed to import deck');
    }
    return response.json();
};

export const updateDeck = async (id: string, name: string, description?: string): Promise<Deck> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/decks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, description })
    });
    if (!response.ok) throw new Error('Failed to update deck');
    return response.json();
};
