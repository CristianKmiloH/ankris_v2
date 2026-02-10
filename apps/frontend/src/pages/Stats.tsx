import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import LoadingScreen from '../components/common/LoadingScreen';
import { getStats, type StatsData } from '../services/statsService';
import { getAllCards, type Card } from '../services/cardService';
import DailyLoadChart from '../components/stats/DailyLoadChart';
import RetentionChart from '../components/stats/RetentionChart';
import StudyHistory from '../components/stats/StudyHistory';
import StatsCardListModal from '../components/stats/StatsCardListModal';
import { useTranslation } from '../i18n/useTranslation';

const Stats: React.FC = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<StatsData | null>(null);
    const { t } = useTranslation();

    // Modal State
    const [allCards, setAllCards] = useState<Card[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalCards, setModalCards] = useState<Card[]>([]);
    const [loadingCards, setLoadingCards] = useState(false);

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

    const handleStatClick = async (type: 'new' | 'learning' | 'review') => {
        if (!stats) return;

        let cardsToFilter = allCards;

        // Fetch cards if not already loaded
        if (allCards.length === 0) {
            setLoadingCards(true);
            try {
                cardsToFilter = await getAllCards();
                setAllCards(cardsToFilter);
            } catch (e) {
                console.error("Failed to load cards", e);
                setLoadingCards(false);
                return;
            } finally {
                setLoadingCards(false);
            }
        }

        let filtered: Card[] = [];
        let title = '';

        if (type === 'new') {
            title = t('new') || 'New';
            filtered = cardsToFilter.filter(c => c.state === 0);
        } else if (type === 'learning') {
            title = t('learning') || 'Learning';
            // Assuming Learning=1, Relearning=3. Adjust if needed.
            filtered = cardsToFilter.filter(c => c.state === 1 || c.state === 3);
        } else if (type === 'review') {
            title = t('review') || 'Review';
            filtered = cardsToFilter.filter(c => c.state === 2);
        }

        setModalTitle(title);
        setModalCards(filtered);
        setIsModalOpen(true);
    };

    const handleSelectCard = (card: Card) => {
        setIsModalOpen(false);
        // Navigate to study this specific card
        // We use the card's deckId to ensure proper routing context
        navigate(`/decks/${card.deckId}/study?type=card&cardId=${card.id}`);
    };

    if (!stats) return <LoadingScreen />;

    return (
        <Layout
            activeTab="stats"
            title={t('statistics')}
            subtitle={t('learningProgress')}
        >
            <div style={styles.container}>
                {/* Key Metrics - Interactive Capsules */}
                <div style={styles.metricsContainer}>
                    <div style={styles.metricCard}>
                        <p style={styles.metricLabel}>{t('totalCards')}</p>
                        <h2 style={styles.metricValue}>{stats.totalCards}</h2>
                    </div>
                    {/* New - Interactive */}
                    <div
                        style={{ ...styles.metricCard, cursor: 'pointer', borderColor: 'var(--accent-purple-dim)' }}
                        onClick={() => handleStatClick('new')}
                        className="scale-on-hover"
                    >
                        <p style={{ ...styles.metricLabel, color: 'var(--accent-purple)' }}>{t('new')}</p>
                        <h2 style={styles.metricValue}>{stats.newCards}</h2>
                    </div>
                    {/* Learning - Interactive */}
                    <div
                        style={{ ...styles.metricCard, cursor: 'pointer', borderColor: 'var(--accent-orange-dim)' }}
                        onClick={() => handleStatClick('learning')}
                        className="scale-on-hover"
                    >
                        <p style={{ ...styles.metricLabel, color: 'var(--accent-orange)' }}>{t('learning')}</p>
                        <h2 style={styles.metricValue}>{stats.learningCards}</h2>
                    </div>
                    {/* Review - Interactive */}
                    <div
                        style={{ ...styles.metricCard, cursor: 'pointer', borderColor: 'var(--accent-green-dim)' }}
                        onClick={() => handleStatClick('review')}
                        className="scale-on-hover"
                    >
                        <p style={{ ...styles.metricLabel, color: 'var(--accent-green)' }}>{t('review')}</p>
                        <h2 style={styles.metricValue}>{stats.reviewCards}</h2>
                    </div>
                </div>

                {/* Charts Area - Flexible */}
                <div style={styles.chartsContainer}>
                    <StudyHistory />
                    <div style={styles.chartWrapper}>
                        <DailyLoadChart data={stats.dailyLoad} />
                    </div>
                    <div style={styles.chartWrapper}>
                        <RetentionChart rate={stats.retentionRate} />
                    </div>
                </div>

                {/* Card List Modal */}
                <StatsCardListModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={modalTitle}
                    cards={modalCards}
                    onSelectCard={handleSelectCard}
                />

                {loadingCards && (
                    <div style={styles.loadingOverlay}>
                        <div className="spinner"></div>
                    </div>
                )}
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
        transition: 'transform 0.2s, border-color 0.2s',
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
    },
    loadingOverlay: {
        position: 'fixed' as const,
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

export default Stats;
