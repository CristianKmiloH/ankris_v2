import { getAllCards } from '../cards/card.service';

interface UserStats {
    totalCards: number;
    newCards: number;
    learningCards: number;
    reviewCards: number;
    totalReviews: number; // New metric
    retentionRate: number;
    dailyLoad: { date: string; count: number }[];
}

export const getUserStats = async (userId: string): Promise<UserStats> => {
    const cards = await getAllCards(userId);

    // Real Forecast Data (Next 7 Days)
    const dailyLoad = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        d.setHours(0, 0, 0, 0); // Start of day

        const nextDay = new Date(d);
        nextDay.setDate(d.getDate() + 1);

        // Count cards due on this day (or overdue for today)
        const count = cards.filter(c => {
            const due = new Date(c.due);
            if (i === 0) {
                // For today, include overdue
                return due < nextDay;
            }
            return due >= d && due < nextDay;
        }).length;

        return {
            date: d.toLocaleDateString('en-US', { weekday: 'short' }),
            count
        };
    });

    return {
        totalCards: cards.length,
        newCards: cards.filter(c => c.state === 0).length,
        learningCards: cards.filter(c => c.state === 1).length,
        reviewCards: cards.filter(c => c.state === 2).length,
        totalReviews: cards.reduce((sum, c) => sum + (c.reps || 0), 0),
        retentionRate: 100, // Default to 100% until history tracking is implemented
        dailyLoad
    };
};
