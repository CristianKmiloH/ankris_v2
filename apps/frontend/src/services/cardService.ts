export interface Card {
    id: string;
    front: string;
    back: string;
    deckId: string;
    due: string;
    state: number;
}

import { API_BASE_URL } from '../config';
const API_URL = `${API_BASE_URL}/api`;

export const getAllCards = async (): Promise<Card[]> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/cards`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
        console.error('Failed to fetch cards:', response.statusText);
        throw new Error('Failed to fetch cards');
    }

    return response.json();

    return response.json();
};

export const updateCard = async (id: string, front: string, back: string): Promise<Card> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/cards/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ front, back })
    });

    if (!response.ok) {
        console.error('Failed to update card:', response.statusText);
        throw new Error('Failed to update card');
    }

    return response.json();
};

export const deleteCard = async (id: string): Promise<void> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/cards/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) {
        console.error('Failed to delete card:', response.statusText);
        throw new Error('Failed to delete card');
    }
};
