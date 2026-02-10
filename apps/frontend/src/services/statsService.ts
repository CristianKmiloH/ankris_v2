export interface StatsData {
    totalCards: number;
    newCards: number;
    learningCards: number;
    reviewCards: number;
    totalReviews: number;
    retentionRate: number;
    dailyLoad: { date: string; count: number }[];
}

export interface HistoryData {
    total: number;
    timeline: { date: string; count: number }[];
    grades: { 1: number; 2: number; 3: number; 4: number };
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

export const getHistory = async (start?: Date, end?: Date): Promise<HistoryData> => {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams();
    if (start) params.append('start', start.toISOString());
    if (end) params.append('end', end.toISOString());
    params.append('offset', new Date().getTimezoneOffset().toString());

    const response = await fetch(`${API_BASE_URL}/api/stats/history?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) throw new Error('Failed to fetch history');
    return response.json();
};
