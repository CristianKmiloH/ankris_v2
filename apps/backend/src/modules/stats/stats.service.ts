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

export const getStudyHistory = async (userId: string, start: Date, end: Date, offsetMinutes: number = 0) => {
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

    // Aggregate by day using Client's Local Time
    const dayMap = new Map<string, number>();
    const gradeCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };

    logs.forEach(log => {
        // Adjust UTC time to Local Time by subtracting the offset (minutes)
        // getTimezoneOffset() returns positive for zones behind UTC (e.g. 300 for EST)
        // So UTC - 300min = Local Time
        const localTime = log.reviewDate.getTime() - (offsetMinutes * 60 * 1000);
        const dayKey = new Date(localTime).toISOString().split('T')[0];

        dayMap.set(dayKey, (dayMap.get(dayKey) || 0) + 1);
        if (log.grade >= 1 && log.grade <= 4) {
            gradeCounts[log.grade as 1 | 2 | 3 | 4]++;
        }
    });

    // Sort timeline by date
    const sortedTimeline = Array.from(dayMap.entries())
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));

    return {
        total: logs.length,
        timeline: sortedTimeline,
        grades: gradeCounts
    };
};
