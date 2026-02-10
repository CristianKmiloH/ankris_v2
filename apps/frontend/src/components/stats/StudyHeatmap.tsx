import React, { useEffect, useState } from 'react';
import { getHistory } from '../../services/statsService';
import { useTranslation } from '../../i18n/useTranslation';
import './StudyHistory.css'; // Share styles

const StudyHeatmap: React.FC = () => {
    const { t } = useTranslation();
    const [heatmapData, setHeatmapData] = useState<Map<string, number>>(new Map());
    // const [loading, setLoading] = useState(true); // Unused for now

    // Config: Show last 6 months approx (26 weeks)
    const WEEKS_TO_SHOW = 26;

    useEffect(() => {
        fetchHeatmapData();
    }, []);

    const fetchHeatmapData = async () => {
        try {
            const end = new Date();
            const start = new Date();
            start.setDate(start.getDate() - (WEEKS_TO_SHOW * 7)); // Go back X weeks

            const data = await getHistory(start, end);

            // Convert array to Map for O(1) lookup
            const map = new Map<string, number>();
            data.timeline.forEach(item => {
                // Ensure date string matches local date comparison
                // The API returns UTC usually, let's normalize to YYYY-MM-DD
                const dateKey = new Date(item.date).toISOString().split('T')[0];
                map.set(dateKey, item.count);
            });
            setHeatmapData(map);
        } catch (e) {
            console.error("Failed to load heatmap", e);
        } finally {
            // setLoading(false);
        }
    };

    // Generate grid dates
    const generateDates = () => {
        const dates: Date[] = [];
        const today = new Date();
        const endDate = new Date(today);

        // Align end date to Saturday to finish the grid properly? 
        // Or align start date to Sunday?
        // GitHub aligns start date to Sunday.

        const startDate = new Date(today);
        startDate.setDate(today.getDate() - (WEEKS_TO_SHOW * 7));

        // Find the Sunday before/of startDate
        const day = startDate.getDay(); // 0 is Sunday
        startDate.setDate(startDate.getDate() - day);

        const current = new Date(startDate);
        while (current <= endDate) {
            dates.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        return dates;
    };

    const dates = generateDates();

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
                    {dates.map((date) => {
                        const dateKey = date.toISOString().split('T')[0];
                        const count = heatmapData.get(dateKey) || 0;
                        const level = getClassForCount(count);
                        const dayLabel = date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });

                        return (
                            <div
                                key={dateKey}
                                className={`heatmap-cell ${level}`}
                                title={`${count} reviews on ${dayLabel}`}
                                data-date={dateKey}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="heatmap-legend">
                <span>Less</span>
                <div className="legend-cell level-0"></div>
                <div className="legend-cell level-1"></div>
                <div className="legend-cell level-2"></div>
                <div className="legend-cell level-3"></div>
                <div className="legend-cell level-4"></div>
                <span>More</span>
            </div>
        </div>
    );
};

export default StudyHeatmap;
