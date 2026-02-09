import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getHistory, type HistoryData } from '../../services/statsService';
import { useTranslation } from '../../i18n/useTranslation';

const StudyHistory: React.FC = () => {
    const { t } = useTranslation();
    const [range, setRange] = useState<'day' | 'week' | 'month'>('week');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [data, setData] = useState<HistoryData | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchHistory();
    }, [range, currentDate]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const start = new Date(currentDate);
            const end = new Date(currentDate);

            if (range === 'day') {
                // Single day (00:00 to 23:59)
                start.setHours(0, 0, 0, 0);
                end.setHours(23, 59, 59, 999);
            } else if (range === 'week') {
                // Current week (Monday to Sunday)
                const day = start.getDay() || 7; // 1=Mon, 7=Sun
                if (day !== 1) start.setHours(-24 * (day - 1));
                start.setHours(0, 0, 0, 0);
                end.setTime(start.getTime() + 7 * 24 * 60 * 60 * 1000 - 1);
            } else if (range === 'month') {
                // Current month
                start.setDate(1);
                start.setHours(0, 0, 0, 0);
                end.setMonth(end.getMonth() + 1);
                end.setDate(0);
                end.setHours(23, 59, 59, 999);
            }

            const history = await getHistory(start, end);
            setData(history);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        const d = new Date(currentDate);
        if (range === 'day') d.setDate(d.getDate() + 1);
        else if (range === 'week') d.setDate(d.getDate() + 7);
        else if (range === 'month') d.setMonth(d.getMonth() + 1);
        setCurrentDate(d);
    };

    const handlePrev = () => {
        const d = new Date(currentDate);
        if (range === 'day') d.setDate(d.getDate() - 1);
        else if (range === 'week') d.setDate(d.getDate() - 7);
        else if (range === 'month') d.setMonth(d.getMonth() - 1);
        setCurrentDate(d);
    };

    const formatDateRange = () => {
        const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
        if (range === 'day') return currentDate.toLocaleDateString('es-ES', opts);
        if (range === 'month') return currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

        // Week range
        const start = new Date(currentDate);
        const day = start.getDay() || 7;
        start.setDate(start.getDate() - (day - 1));
        const end = new Date(start);
        end.setDate(end.getDate() + 6);
        return `${start.toLocaleDateString('es-ES', opts)} - ${end.toLocaleDateString('es-ES', opts)}`;
    };

    if (!data && loading) return <div style={styles.loading}>Loading history...</div>;

    // Transform data for Recharts if needed, or use directly
    const chartData = data?.timeline || [];

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>{t('studyHistory') || 'Study History'}</h3>
                <div style={styles.controls}>
                    <div style={styles.pillContainer}>
                        {(['day', 'week', 'month'] as const).map(r => (
                            <button
                                key={r}
                                style={{
                                    ...styles.pill,
                                    ...(range === r ? styles.pillActive : {})
                                }}
                                onClick={() => setRange(r)}
                            >
                                {r.charAt(0).toUpperCase() + r.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div style={styles.navRow}>
                <button style={styles.navButton} onClick={handlePrev}>←</button>
                <span style={styles.dateLabel}>{formatDateRange()}</span>
                <button style={styles.navButton} onClick={handleNext}>→</button>
            </div>

            <div style={styles.summaryRow}>
                <div style={styles.summaryItem}>
                    <span style={styles.summaryValue}>{data?.total || 0}</span>
                    <span style={styles.summaryLabel}>{t('reviews') || 'Reviews'}</span>
                </div>
                {/* Could add grade breakdown here */}
            </div>

            <div style={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#666', fontSize: 10 }}
                            interval={range === 'month' ? 2 : 0}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e1e20', border: 'none', borderRadius: '8px' }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                            {chartData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill="var(--accent-purple)" />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: 'var(--bg-card)',
        borderRadius: '24px',
        padding: '20px',
        border: '1px solid var(--bg-card-elevated)',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '16px',
        minHeight: '350px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: '1.1rem',
        fontWeight: '700',
        color: 'var(--text-primary)',
        margin: 0,
    },
    controls: {
        display: 'flex',
        gap: '8px',
    },
    pillContainer: {
        display: 'flex',
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: '20px',
        padding: '2px',
    },
    pill: {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'var(--text-secondary)',
        padding: '6px 12px',
        borderRadius: '16px',
        fontSize: '0.8rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    },
    pillActive: {
        backgroundColor: 'var(--bg-card-elevated)',
        color: 'var(--text-primary)',
        fontWeight: '600',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    },
    navRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
    },
    navButton: {
        background: 'none',
        border: '1px solid var(--bg-card-elevated)',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
    },
    dateLabel: {
        color: 'var(--text-primary)',
        fontWeight: '600',
        fontSize: '0.95rem',
        minWidth: '120px',
        textAlign: 'center' as const,
    },
    summaryRow: {
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        paddingBottom: '8px',
    },
    summaryItem: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
    },
    summaryValue: {
        fontSize: '1.5rem',
        fontWeight: '800',
        color: 'var(--text-primary)',
    },
    summaryLabel: {
        fontSize: '0.75rem',
        color: 'var(--text-secondary)',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px',
    },
    chartContainer: {
        flex: 1,
        minHeight: '200px',
        width: '100%',
    },
    loading: {
        padding: '20px',
        textAlign: 'center' as const,
        color: 'var(--text-secondary)',
    }
};

export default StudyHistory;
