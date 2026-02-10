import { API_BASE_URL } from '../config';

export interface Deck {
    id: string;
    name: string;
    description?: string;
    isFavorite: boolean;
    orderIndex: number;

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
        let errorMessage = 'Failed to import deck';
        try {
            const err = await response.json();
            errorMessage = err.error || errorMessage;
        } catch (e) {
            // If JSON parse fails, use status text (e.g. "Payload Too Large" or "Gateway Timeout")
            errorMessage = `Server Error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
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
    return response.json();
};

export const toggleFavorite = async (id: string, isFavorite: boolean): Promise<Deck> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/decks/${id}/favorite`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ isFavorite })
    });
    if (!response.ok) throw new Error('Failed to toggle favorite');
    return response.json();
};

export const reorderDeck = async (id: string, direction: 'up' | 'down'): Promise<Deck[]> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/decks/${id}/reorder`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ direction })
    });
});
if (!response.ok) throw new Error('Failed to reorder deck');
return response.json();
};

export const updateDeckOrder = async (deckIds: string[]): Promise<void> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/decks/reorder-batch`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ deckIds })
    });
    if (!response.ok) throw new Error('Failed to save deck order');
};
