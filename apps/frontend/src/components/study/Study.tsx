import React, { useEffect, useState, useCallback } from 'react';
import { MEDIA_BASE_URL } from '../../config';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import LoadingScreen from '../common/LoadingScreen';
import { getDueCards, getAllDueCards, answerCard, type Card } from '../../services/noteService';
import { useTranslation } from '../../i18n/useTranslation';
import parse from 'html-react-parser';

const Study: React.FC = () => {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [cards, setCards] = useState<Card[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If we are at /study (no ID) but have a saved deck, redirect to it
        if (!deckId) {
            const savedDeckId = localStorage.getItem('lastActiveDeckId');
            if (savedDeckId) {
                navigate(`/decks/${savedDeckId}/study`, { replace: true });
                return;
            }
        } else {
            // We have a specific deckId, save it as the active one
            localStorage.setItem('lastActiveDeckId', deckId);
        }

        loadCards(deckId);
    }, [deckId, navigate]);

    const loadCards = async (id?: string, forceAll: boolean = false) => {
        setLoading(true); // Ensure loading state resets
        try {
            const data = id ? await getDueCards(id, forceAll) : await getAllDueCards();
            setCards(data);
            setCurrentCardIndex(0); // Reset index on load
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = useCallback(async (grade: number) => {
        if (!cards.length) return;
        const card = cards[currentCardIndex];
        try {
            await answerCard(card.id, grade);
            const nextIndex = currentCardIndex + 1;

            if (nextIndex < cards.length) {
                setIsFlipped(false);
                // Delay content update to allow flip-back animation to cover the answer
                setTimeout(() => {
                    setCurrentCardIndex(nextIndex);
                }, 300);
            } else {
                // Session complete - reload to show "All Caught Up" screen
                setCards([]);
            }
        } catch (err) {
            console.error(err);
            alert('Error submitting answer');
        }
    }, [cards, currentCardIndex, t]);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (loading || cards.length === 0) return;

            if (!isFlipped) {
                if (e.code === 'Space' || e.code === 'Enter') {
                    e.preventDefault();
                    setIsFlipped(true);
                }
            } else {
                if (e.key === '1') handleAnswer(1);
                if (e.key === '2') handleAnswer(2);
                if (e.key === '3') handleAnswer(3);
                if (e.key === '4') handleAnswer(4);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isFlipped, loading, cards.length, handleAnswer]);

    return (
        <Layout activeTab="study">
            {loading ? (
                <LoadingScreen />
            ) : cards.length === 0 ? (
                <div style={styles.emptyContainer}>
                    <h2 style={styles.emptyTitle}>
                        {t('allCaughtUp')} <span style={{ fontSize: '2.5rem' }}>🎉</span>
                    </h2>
                    <p style={styles.emptyText}>{t('noCardsDue')}</p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button onClick={() => navigate('/')} className="btn-primary">
                            {t('backToDecks')}
                        </button>
                        <button
                            onClick={() => loadCards(deckId, true)}
                            className="btn-secondary"
                        >
                            Estudiar Todo de Nuevo
                        </button>
                    </div>
                </div>
            ) : (
                <div style={styles.container}>
                    {/* Progress Counter - Top Right */}
                    <div className="progress-counter" style={{ position: 'relative', top: 0, right: 0, alignSelf: 'flex-end', marginBottom: '10px' }}>
                        {currentCardIndex + 1} / {cards.length}
                    </div>

                    {/* Main Study Card */}
                    <div style={styles.cardContainer}>
                        <div style={styles.card} className={`study-card ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
                            <div className="card-inner">
                                {/* Front */}
                                <div className="card-front">
                                    <div style={styles.cardHeader}>
                                        <span className="badge">{t('question')}</span>
                                        {/* Deck name requires fetching decks, omitting for now */}
                                        <h3 style={styles.deckName}>Ankris</h3>
                                    </div>
                                    <div style={styles.cardContent}>
                                        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', paddingBottom: '20px', boxSizing: 'border-box' }}>
                                            <h1 style={styles.questionText}>
                                                {parse(cards[currentCardIndex].front, {
                                                    replace: (domNode) => {
                                                        if (domNode.type === 'text') {
                                                            const text = domNode.data;
                                                            // Check for [sound:file.mp3] pattern
                                                            const soundMatch = text.match(/\[sound:(.*?)\]/);
                                                            if (soundMatch) {
                                                                const filename = soundMatch[1];
                                                                const cleanText = text.replace(/\[sound:.*?\]/g, '');

                                                                return (
                                                                    <>
                                                                        {cleanText}
                                                                        <AudioButton filename={filename} />
                                                                    </>
                                                                );
                                                            }
                                                        }
                                                        // Handle Images - Fix src relative path
                                                        if (domNode.type === 'tag' && domNode.name === 'img') {
                                                            const src = domNode.attribs.src;
                                                            if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                                                                domNode.attribs.src = `${MEDIA_BASE_URL}/${src}`;
                                                                domNode.attribs.style = "max-width: 100%; border-radius: 12px; margin-top: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);";
                                                            }
                                                        }
                                                    }
                                                })}
                                            </h1>
                                        </div>
                                    </div>
                                    {/* Animated Corner Flip Icon - Moved to Top Right - Matches Library Style */}
                                    <div className="flip-icon" style={{ position: 'absolute', top: '12px', right: '12px', color: 'var(--accent-cyan)', opacity: 0.8 }}>
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Back */}
                                <div className="card-back">
                                    <div style={styles.cardHeader}>
                                        <span className="badge badge-accent">{t('answer')}</span>
                                    </div>
                                    <div style={styles.cardContent}>
                                        <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', paddingBottom: '20px', boxSizing: 'border-box' }}>
                                            <p style={styles.answerText}>
                                                {parse(cards[currentCardIndex].back, {
                                                    replace: (domNode) => {
                                                        if (domNode.type === 'text') {
                                                            const text = domNode.data;
                                                            // Check for [sound:file.mp3] pattern
                                                            const soundMatch = text.match(/\[sound:(.*?)\]/);
                                                            if (soundMatch) {
                                                                const filename = soundMatch[1];
                                                                const cleanText = text.replace(/\[sound:.*?\]/g, '');

                                                                return (
                                                                    <>
                                                                        {cleanText}
                                                                        <AudioButton filename={filename} />
                                                                    </>
                                                                );
                                                            }
                                                        }
                                                        // Handle Images - Fix src relative path
                                                        if (domNode.type === 'tag' && domNode.name === 'img') {
                                                            const src = domNode.attribs.src;
                                                            if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                                                                domNode.attribs.src = `http://localhost:3000/media/${src}`;
                                                                domNode.attribs.style = "max-width: 100%; border-radius: 12px; margin-top: 10px;";
                                                            }
                                                        }
                                                    }
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Animated Corner Flip Icon - Back */}
                                    <div className="flip-icon" style={{ position: 'absolute', top: '12px', right: '12px', color: 'var(--accent-cyan)', opacity: 0.8 }}>
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={styles.actionsContainer}>
                        {isFlipped ? (
                            <div style={styles.responseButtons} className="slide-in">
                                <button onClick={() => handleAnswer(3)} className="btn-easy">
                                    {t('easy')}
                                </button>
                                <button onClick={() => handleAnswer(2)} className="btn-normal">
                                    {t('good')}
                                </button>
                                <button onClick={() => handleAnswer(1)} className="btn-hard">
                                    {t('hard')}
                                </button>
                            </div>
                        ) : (
                            <button onClick={() => setIsFlipped(true)} className="btn-primary" style={{ width: '100%', maxWidth: '400px' }}>
                                {t('showAnswer')}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </Layout>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    emptyContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px', // Tighter gap
        textAlign: 'center',
        flex: 1,
        padding: '20px',
    },
    emptyTitle: {
        fontSize: '3rem', // Larger
        fontWeight: '900',
        color: 'var(--text-primary)',
        marginBottom: '0px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    emptyText: {
        fontSize: '1.2rem',
        color: 'var(--text-secondary)',
        maxWidth: '400px',
        lineHeight: '1.5',
    },
    cardContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        margin: '0', // Removed margin completely
        padding: '10px 10px', // Minimal padding
        minHeight: '400px', // Enforce minimum height
        zIndex: 1,
    },
    card: {
        width: '100%',
        maxWidth: '600px', // Increased to allow growth
        height: '100%',
        maxHeight: '100%', // Fill available space
        // aspectRatio removed to allow full vertical filling
        display: 'flex',
        flexDirection: 'column',
    },
    cardHeader: {
        marginBottom: '16px', // Compact header
    },
    cardContent: {
        flex: 1,
        // Layout handled by inner wrapper now
        textAlign: 'center',
        overflowY: 'auto',
        padding: '0 20px', // Restore standard padding, spacing handled by wrapper/spacer
        width: '100%',
    },
    deckName: {
        marginTop: '12px',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        fontWeight: '500',
    },
    questionText: {
        fontSize: 'clamp(1.5rem, 5vw, 3rem)',
        fontWeight: '800',
        lineHeight: '1.2',
        width: '100%',
        wordBreak: 'break-word',
    },
    answerText: {
        fontSize: 'clamp(1.25rem, 4vw, 2rem)',
        lineHeight: '1.5',
        color: 'var(--text-primary)',
        width: '100%',
        wordBreak: 'break-word',
    },
    actionsContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        paddingTop: '5px',
        paddingBottom: '5px', // Reduced from 15px to 5px
        marginBottom: '0px',
    },
    responseButtons: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px', // Tighter buttons
        width: '100%',
        maxWidth: '600px',
    },
};

// Extracted Audio Button Component to handle playing state
const AudioButton: React.FC<{ filename: string }> = ({ filename }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const playAudio = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (isPlaying) return; // Prevent double play

        const audio = new Audio(`http://localhost:3000/media/${filename}`);

        setIsPlaying(true);
        audio.play().catch(err => {
            console.error("Audio play error", err);
            setIsPlaying(false);
        });

        audio.onended = () => {
            setIsPlaying(false);
        };

        // Safety timeout in case onended fails
        audio.onerror = () => setIsPlaying(false);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }} onClick={(e) => e.stopPropagation()}>
            <button
                className={`anim-audio-btn ${isPlaying ? 'playing' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={playAudio}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {/* Speaker Body - Static */}
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" fillOpacity="0.2"></polygon>
                    {/* Small Wave */}
                    <path className="wave-1" d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    {/* Large Wave */}
                    <path className="wave-2" d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                </svg>
            </button>
        </div>
    );
};

export default Study;
