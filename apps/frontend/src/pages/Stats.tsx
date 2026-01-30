import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import LoadingScreen from '../components/common/LoadingScreen';
import { getStats, type StatsData } from '../services/statsService';
import DailyLoadChart from '../components/stats/DailyLoadChart';
import RetentionChart from '../components/stats/RetentionChart';
import { useTranslation } from '../i18n/useTranslation';

const Stats: React.FC = () => {
    const [stats, setStats] = useState<StatsData | null>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getStats();
                setStats(data);
            } catch (e) {
                console.error(e);
            }
        };
        load();
    }, []);

    if (!stats) return <LoadingScreen />;

    return (
        <Layout
            activeTab="stats"
            title={t('statistics')}
            subtitle={t('learningProgress')}
        >
            <div style={styles.container}>
                {/* Key Metrics - Fixed or Top Priority */}
                <div style={styles.metricsContainer}>
                    <div style={styles.metricCard}>
                        <p style={styles.metricLabel}>{t('totalCards')}</p>
                        <h2 style={styles.metricValue}>{stats.totalCards}</h2>
                    </div>
                    <div style={styles.metricCard}>
                        <p style={{ ...styles.metricLabel, color: 'var(--accent-purple)' }}>{t('new')}</p>
                        <h2 style={styles.metricValue}>{stats.newCards}</h2>
                    </div>
                    <div style={styles.metricCard}>
                        <p style={{ ...styles.metricLabel, color: 'var(--accent-orange)' }}>{t('learning')}</p>
                        <h2 style={styles.metricValue}>{stats.learningCards}</h2>
                    </div>
                    <div style={styles.metricCard}>
                        <p style={{ ...styles.metricLabel, color: 'var(--accent-green)' }}>{t('review')}</p>
                        <h2 style={styles.metricValue}>{stats.reviewCards}</h2>
                    </div>
                </div>

                {/* Charts Area - Flexible */}
                <div style={styles.chartsContainer}>
                    <div style={styles.chartWrapper}>
                        <DailyLoadChart data={stats.dailyLoad} />
                    </div>
                    <div style={styles.chartWrapper}>
                        <RetentionChart rate={stats.retentionRate} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const styles = {
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
        overflow: 'hidden',
    },
    metricsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '20px',
        flexShrink: 0,
        width: '100%',
    },
    metricCard: {
        backgroundColor: 'var(--bg-card)',
        padding: '12px 6px',
        borderRadius: '16px',
        border: '1px solid var(--bg-card-elevated)',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center' as const,
        minWidth: '0',
        overflow: 'hidden',
    },
    metricLabel: {
        fontSize: '0.65rem',
        color: 'var(--text-secondary)',
        marginBottom: '4px',
        fontWeight: '700',
        letterSpacing: '0.5px',
        lineHeight: '1.2',
        textAlign: 'center' as const,
        width: '100%',
        textTransform: 'uppercase' as const,
        wordWrap: 'break-word' as const,
    },
    metricValue: {
        fontSize: '1.25rem',
        fontWeight: '800',
        color: 'var(--text-primary)',
        lineHeight: '1',
    },
    chartsContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '16px',
        overflowY: 'auto' as const,
        paddingBottom: '20px',
        paddingRight: '4px',
        scrollbarWidth: 'none' as const,
    },
    chartWrapper: {
        backgroundColor: 'var(--bg-card)',
        padding: '20px',
        borderRadius: '24px',
        border: '1px solid var(--bg-card-elevated)',
        flexShrink: 0,
        minHeight: '280px', // Sufficient height for stats
        display: 'flex',
        flexDirection: 'column' as const,
    }
};

export default Stats;
