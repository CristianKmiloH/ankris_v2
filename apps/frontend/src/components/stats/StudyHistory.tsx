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
                start.setHours(0, 0, 0, 0);
                end.setHours(23, 59, 59, 999);
            } else if (range === 'week') {
                const day = start.getDay() || 7;
                if (day !== 1) start.setHours(-24 * (day - 1));
                start.setHours(0, 0, 0, 0);
                end.setTime(start.getTime() + 7 * 24 * 60 * 60 * 1000 - 1);
            } else if (range === 'month') {
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

        const start = new Date(currentDate);
        const day = start.getDay() || 7;
        start.setDate(start.getDate() - (day - 1));
        const end = new Date(start);
        end.setDate(end.getDate() + 6);
        return `${start.toLocaleDateString('es-ES', opts)} - ${end.toLocaleDateString('es-ES', opts)}`;
    };

    const chartData = data?.timeline || [];

    if (!data && loading) return <div style={styles.loading}>Loading...</div>;

    return (
        <div style={styles.container}>
            {/* Header: Title & Tabs */}
            <div style={styles.header}>
                <h3 style={styles.title}>{t('studyHistory') || 'Study History'}</h3>
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
                            {t(r === 'day' ? 'days_mon' : r === 'week' ? 'week' : 'month') === 'days_mon' ? 'Día' :
                                t(r === 'day' ? 'days_mon' : r === 'week' ? 'week' : 'month') === 'week' ? 'Sem' :
                                    t(r === 'day' ? 'days_mon' : r === 'week' ? 'week' : 'month') === 'month' ? 'Mes' :
                                        r.charAt(0).toUpperCase() + r.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Navigation & Summary Date */}
            <div style={styles.navRow}>
                <button style={styles.navButton} onClick={handlePrev}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                </button>

                <span style={styles.dateLabel}>{formatDateRange()}</span>

                <button style={styles.navButton} onClick={handleNext}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                </button>
            </div>

            {/* Big Stat Display */}
            <div style={styles.summaryRow}>
                <div style={styles.summaryItem}>
                    <span style={styles.summaryValue}>{data?.total || 0}</span>
                    <span style={styles.summaryLabel}>{t('reviews') || 'Reviews'}</span>
                </div>
            </div>

            {/* Chart */}
            <div style={styles.chartContainer}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 600 }}
                            interval={range === 'month' ? 4 : 0}
                            dy={10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(30,30,32,0.95)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                                padding: '8px 12px'
                            }}
                            cursor={{ fill: 'rgba(255,255,255,0.03)', radius: 4 }}
                            itemStyle={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}
                            labelStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', marginBottom: '4px' }}
                        />
                        <Bar dataKey="count" radius={[6, 6, 6, 6]} barSize={range === 'month' ? 6 : 12}>
                            {chartData.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill="url(#gradientBar)"
                                />
                            ))}
                        </Bar>
                        <defs>
                            <linearGradient id="gradientBar" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--accent-purple)" />
                                <stop offset="100%" stopColor="var(--accent-purple)" stopOpacity={0.6} />
                            </linearGradient>
                        </defs>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: 'var(--bg-card)',
        borderRadius: '28px',
        padding: '20px 24px',
        border: '1px solid var(--bg-card-elevated)',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '20px',
        minHeight: '380px',
        position: 'relative' as const,
        overflow: 'hidden',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '4px',
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: '800',
        color: 'var(--text-primary)',
        margin: 0,
        letterSpacing: '-0.02em',
    },
    pillContainer: {
        display: 'flex',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: '100px',
        padding: '3px',
        gap: '2px',
    },
    pill: {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'rgba(255,255,255,0.5)',
        padding: '6px 14px',
        borderRadius: '100px',
        fontSize: '0.75rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.2, 0, 0.2, 1)',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px',
    },
    pillActive: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        color: 'var(--text-primary)',
        fontWeight: '700',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    },
    navRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 10px',
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: '20px',
        height: '64px',
    },
    navButton: {
        background: 'rgba(255,255,255,0.05)',
        border: 'none',
        borderRadius: '50%',
        width: '44px',
        height: '44px',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease',
    },
    dateLabel: {
        color: 'var(--text-primary)',
        fontWeight: '700',
        fontSize: '1rem',
        textAlign: 'center' as const,
        letterSpacing: '0.5px',
    },
    summaryRow: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '4px',
    },
    summaryItem: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        gap: '4px',
    },
    summaryValue: {
        fontSize: '2.5rem',
        fontWeight: '900',
        color: 'var(--accent-purple)',
        lineHeight: '1',
        textShadow: '0 4px 20px rgba(138, 43, 226, 0.4)',
    },
    summaryLabel: {
        fontSize: '0.75rem',
        color: 'rgba(255,255,255,0.5)',
        textTransform: 'uppercase' as const,
        letterSpacing: '2px',
        fontWeight: '600',
    },
    chartContainer: {
        flex: 1,
        minHeight: '160px',
        width: '100%',
        marginTop: '10px',
    },
    loading: {
        padding: '40px',
        textAlign: 'center' as const,
        color: 'rgba(255,255,255,0.4)',
    }
};

export default StudyHistory;
