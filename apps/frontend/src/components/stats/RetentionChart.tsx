import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTranslation } from '../../i18n/useTranslation';

interface RetentionProps {
    rate: number;
}

const RetentionChart: React.FC<RetentionProps> = ({ rate }) => {
    const { t } = useTranslation();
    const data = [
        { name: t('retained'), value: rate },
        { name: t('lost'), value: 100 - rate },
    ];
    // Dynamic chart colors? For now static
    const COLORS = ['#10B981', '#374151'];

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
                {t('retentionRate')}
            </h3>
            <div style={{ flex: 1, minHeight: 0, position: 'relative', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                {/* Centered Percentage */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none'
                }}>
                    <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                        {rate.toFixed(1)}%
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {t('target')}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RetentionChart;
