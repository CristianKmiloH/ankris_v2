export interface StatsData {
    totalCards: number;
    newCards: number;
    learningCards: number;
    reviewCards: number;
    totalReviews: number;
    retentionRate: number;
    dailyLoad: { date: string; count: number }[];
}

import { API_BASE_URL } from '../config';

export const getStats = async (): Promise<StatsData> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/api/stats/user`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
};
