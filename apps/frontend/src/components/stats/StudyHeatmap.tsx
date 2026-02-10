import React, { useMemo } from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import './StudyHistory.css'; // Share styles

interface StudyHeatmapProps {
    data: { date: string; count: number }[];
    startDate: Date;
    endDate: Date;
}

const StudyHeatmap: React.FC<StudyHeatmapProps> = ({ data, startDate, endDate }) => {
    const { t } = useTranslation();

    // Transform data to map for O(1) lookup
    const heatmapData = useMemo(() => {
        const map = new Map<string, number>();
        data.forEach(item => {
            const dateKey = new Date(item.date).toISOString().split('T')[0];
            map.set(dateKey, item.count);
        });
        return map;
    }, [data]);

    // Generate dates based on provided range
    const dates = useMemo(() => {
        const datesArr: Date[] = [];
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Logic for Calendar Grid (row-major, Mon-Sun):
        // We need to pad the start to align the first date to the correct weekday column.
        // week starts on Monday (0) to Sunday (6) for this grid.

        const dayOfWeek = start.getDay(); // 0 (Sun) - 6 (Sat)
        // Convert to Monday-based index: 0 (Mon) ... 6 (Sun)
        const mondayBasedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

        const paddedDates: (Date | null)[] = [];
        for (let i = 0; i < mondayBasedDay; i++) {
            paddedDates.push(null);
        }

        const current = new Date(start);
        while (current <= end) {
            paddedDates.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }

        return paddedDates;
    }, [startDate, endDate]);

    // Helper to get color intensity
    const getClassForCount = (count: number) => {
        if (count === 0) return 'level-0';
        if (count <= 5) return 'level-1';
        if (count <= 15) return 'level-2';
        if (count <= 30) return 'level-3';
        return 'level-4';
    };

    // Generate weekdays (Mon-Sun)
    const weekdays = useMemo(() => {
        const days = [];
        const d = new Date();
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        d.setDate(diff); // Set to Monday
        for (let i = 0; i < 7; i++) {
            days.push(new Date(d).toLocaleDateString('es-ES', { weekday: 'short' })); // Force ES or usage language
            d.setDate(d.getDate() + 1);
        }
        return days;
    }, []);

    return (
        <div className="study-heatmap-container">
            <h4 className="heatmap-title">{t('activityLog' as any) || 'Activity Log'}</h4>
            <div className="heatmap-scroll-wrapper">
                <div className="heatmap-header">
                    {weekdays.map((day, i) => (
                        <div key={i} className="heatmap-day-label">{day}</div>
                    ))}
                </div>
                <div className="heatmap-grid">
                    {dates.map((date, i) => {
                        if (!date) {
                            return <div key={`empty-${i}`} className="heatmap-cell empty" style={{ opacity: 0 }} />;
                        }

                        const dateKey = date.toISOString().split('T')[0];
                        const count = heatmapData.get(dateKey) || 0;
                        const level = getClassForCount(count);
                        const dayLabel = date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });

                        return (
                            <div
                                key={dateKey}
                                className={`heatmap-cell ${level}`}
                                title={`${count} reviews on ${dayLabel} (${dateKey})`}
                                data-date={dateKey}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="heatmap-legend">
                <span>-</span>
                <div className="legend-cell level-0"></div>
                <div className="legend-cell level-1"></div>
                <div className="legend-cell level-2"></div>
                <div className="legend-cell level-3"></div>
                <div className="legend-cell level-4"></div>
                <span>+</span>
            </div>
        </div>
    );
};

export default StudyHeatmap;
