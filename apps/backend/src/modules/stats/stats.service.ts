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

import { prisma } from '../../db/prisma';

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

    // Real Retention Calculation
    // Get all logs for this user
    const totalLogs = await prisma.reviewLog.count({ where: { userId } });
    const successLogs = await prisma.reviewLog.count({
        where: {
            userId,
            grade: { gte: 3 } // Good or Easy
        }
    });

    const realRetention = totalLogs > 0 ? Math.round((successLogs / totalLogs) * 100) : 100;

    return {
        totalCards: cards.length,
        newCards: cards.filter(c => c.state === 0).length,
        learningCards: cards.filter(c => c.state === 1).length,
        reviewCards: cards.filter(c => c.state === 2).length,
        totalReviews: cards.reduce((sum, c) => sum + (c.reps || 0), 0),
        retentionRate: realRetention,
        dailyLoad
    };
};

export const getStudyHistory = async (userId: string, start: Date, end: Date) => {
    const logs = await prisma.reviewLog.findMany({
        where: {
            userId,
            reviewDate: {
                gte: start,
                lte: end
            }
        },
        orderBy: { reviewDate: 'asc' }
    });

    // Aggregate by day
    const dayMap = new Map<string, number>();
    const gradeCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };

    logs.forEach(log => {
        const dayKey = log.reviewDate.toISOString().split('T')[0];
        dayMap.set(dayKey, (dayMap.get(dayKey) || 0) + 1);
        if (log.grade >= 1 && log.grade <= 4) {
            gradeCounts[log.grade as 1 | 2 | 3 | 4]++;
        }
    });

    // Fill gaps? Maybe frontend handles it.
    // Return simple structure
    return {
        total: logs.length,
        timeline: Array.from(dayMap.entries()).map(([date, count]) => ({ date, count })),
        grades: gradeCounts
    };
};
