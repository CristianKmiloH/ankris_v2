import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getHistory, type HistoryData } from '../../services/statsService';
import { useTranslation } from '../../i18n/useTranslation';
import StudyHeatmap from './StudyHeatmap';
import './StudyHistory.css';

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

    if (!data && loading) return <div className="study-history-container" style={{ justifyContent: 'center', alignItems: 'center', color: '#666' }}>Loading...</div>;

    return (
        <div className="study-history-container">
            {/* Header: Title & Tabs */}
            <div className="study-history-header">
                <h3 className="study-history-title">{t('studyHistory') || 'Study History'}</h3>
                <div className="study-history-controls">
                    {(['day', 'week', 'month'] as const).map(r => (
                        <button
                            key={r}
                            className={`study-pill ${range === r ? 'active' : ''}`}
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
            <div className="study-nav-row">
                <button className="study-nav-btn" onClick={handlePrev}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                </button>

                <span className="study-date-label">{formatDateRange()}</span>

                <button className="study-nav-btn" onClick={handleNext}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                </button>
            </div>

            {/* Big Stat Display */}
            <div className="study-summary">
                <span className="study-summary-value">{data?.total || 0}</span>
                <span className="study-summary-label">{t('reviews') || 'Reviews'}</span>
            </div>

            {/* Chart */}
            <div className="study-chart-area">
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

            {/* Heatmap Activity Grid */}
            <StudyHeatmap />
        </div>
    );
};

export default StudyHistory;
