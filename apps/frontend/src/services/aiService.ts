import { API_BASE_URL } from '../config';

export const generateCards = async (text: string, language: string = 'en') => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/ai/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text, language })
    });

    if (!response.ok) {
        throw new Error('Failed to generate cards');
    }
    return response.json();
};
