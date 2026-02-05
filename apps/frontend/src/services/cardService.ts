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

export const updateCard = async (
    id: string,
    front: string,
    back: string,
    newFiles?: { front?: File[], back?: File[] }
): Promise<Card> => {
    const token = localStorage.getItem('token');

    let body;
    let headers: Record<string, string> = {
        Authorization: `Bearer ${token}`
    };

    if (newFiles && (newFiles.front?.length || newFiles.back?.length)) {
        const formData = new FormData();
        formData.append('front', front);
        formData.append('back', back);

        if (newFiles.front) {
            newFiles.front.forEach(file => formData.append('new_media_front', file));
        }
        if (newFiles.back) {
            newFiles.back.forEach(file => formData.append('new_media_back', file));
        }
        body = formData;
        // Content-Type header is auto-set by browser with boundary for FormData
    } else {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify({ front, back });
    }

    const response = await fetch(`${API_URL}/cards/${id}`, {
        method: 'PATCH',
        headers,
        body
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
