import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from '../../i18n/useTranslation';

interface DailyLoadChartProps {
    data: { date: string; count: number }[];
}

const DailyLoadChart: React.FC<DailyLoadChartProps> = ({ data }) => {
    const { t } = useTranslation();

    const formatDay = (day: string) => {
        // Map backend English short days to translated values
        // Keys in translations: days.sun, days.mon, etc.
        const dayLower = day.toLowerCase();
        const dayMap: Record<string, string> = {
            'sun': t('days_sun'),
            'mon': t('days_mon'),
            'tue': t('days_tue'),
            'wed': t('days_wed'),
            'thu': t('days_thu'),
            'fri': t('days_fri'),
            'sat': t('days_sat')
        };

        // Return translated day or original if not found
        // If translation returns key (error), fallback to safe char but should work if keys exist
        return dayMap[dayLower] || day;
    };

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{
                color: 'var(--text-primary)',
                marginBottom: '10px',
                fontSize: '1rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                flexShrink: 0
            }}>
                {/* Use 'forecast' key which exists, not 'forecastTitle' */}
                {t('forecast')}
            </h3>
            <div style={{ flex: 1, minHeight: 0, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                        <XAxis
                            dataKey="date"
                            stroke="var(--text-secondary)"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                            tickFormatter={formatDay}
                        />
                        <YAxis
                            stroke="var(--text-secondary)"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-card-elevated)',
                                borderColor: 'var(--bg-card-elevated)',
                                color: 'var(--text-primary)',
                                borderRadius: '12px',
                                boxShadow: 'var(--shadow-card)'
                            }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            // Custom tooltip label formatting
                            labelFormatter={(label) => formatDay(String(label))}
                            // Custom tooltip value name translation
                            formatter={(value: number) => [value, t('cardsCount')]}
                        />
                        <Bar
                            dataKey="count"
                            fill="var(--accent-cyan)"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DailyLoadChart;
