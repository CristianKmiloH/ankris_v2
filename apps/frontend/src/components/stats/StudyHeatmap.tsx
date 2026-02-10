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

        // Ensure we visually align to full weeks if it's a "Month" view?
        // User requesting: "If I choose week -> 7 days". "If I choose Month -> 30 days".
        // So we adhere STRICTLY to the range provided.
        // HOWEVER, for grid alignment, if we use rows=7 (days), we need to know which weekday 'start' is.
        // The CSS grid 'grid-template-rows: repeat(7, ...)' fills strictly Top->Bottom => Sun->Sat.
        // If 'start' is Wednesday, the first square will be top-left (Sunday slot visually), but logic says Wednesday?
        // NO. Getting cells to align to Weekdays requires inserting padding cells.

        // Pad start to Sunday
        const dayOfWeek = start.getDay(); // 0 (Sun) - 6 (Sat)
        // If we want alignment, we must add placeholders BEFORE start?
        // But user wants "Show ONLY 7 days" for week.
        // If Week starts Monday...
        // Let's strictly show the range.
        // If range is shorter than 2 weeks, maybe row-based (horizontal) is better?
        // But if Month, we want vertical colums.

        // Hybrid Approach:
        // Use standard Grid logic:
        // Determine offset from Sunday.
        // Insert 'null' dates for padding.

        const paddedDates: (Date | null)[] = [];
        for (let i = 0; i < dayOfWeek; i++) {
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

    return (
        <div className="study-heatmap-container">
            <h4 className="heatmap-title">{t('activityLog' as any) || 'Activity Log'}</h4>
            <div className="heatmap-scroll-wrapper">
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
