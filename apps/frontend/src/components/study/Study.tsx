import React, { useEffect, useState, useCallback, useRef } from 'react';
import { MEDIA_BASE_URL } from '../../config';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../layout/Layout';
import LoadingScreen from '../common/LoadingScreen';
import { getDueCards, getAllDueCards, answerCard, toggleFavorite, getFavoriteCards, getCardsByCustomSession, type Card } from '../../services/noteService';
import { useTranslation } from '../../i18n/useTranslation';
import parse from 'html-react-parser';


import CustomStudyModal from './CustomStudyModal';

const Study: React.FC = () => {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const [cards, setCards] = useState<Card[]>([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showCustomStudyModal, setShowCustomStudyModal] = useState(false);
    const [triggerHeart, setTriggerHeart] = useState(false);

    // Refs for scrolling containers
    const frontContentRef = React.useRef<HTMLDivElement>(null);
    const backContentRef = React.useRef<HTMLDivElement>(null);

    // Reset scroll position on card change or flip
    useEffect(() => {
        if (frontContentRef.current) {
            frontContentRef.current.scrollTop = 0;
        }
        if (backContentRef.current) {
            backContentRef.current.scrollTop = 0;
        }
    }, [currentCardIndex, isFlipped]);

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

        loadCards(deckId, location.search);
    }, [deckId, navigate, location.search]);

    const loadCards = async (id?: string, queryString?: string) => {
        setLoading(true);
        // Reset cards to show loading state effectively
        setCards([]);

        try {
            const searchParams = new URLSearchParams(queryString || window.location.search);
            const type = searchParams.get('type');
            const cardId = searchParams.get('cardId');

            console.log('Study: Loading cards', { id, type, cardId });

            let data: Card[] = [];
            if (type === 'card' && cardId) {
                // Fetch specific card for custom study
                data = await getCardsByCustomSession([cardId]);
                console.log('Study: Fetched single card', data);
            } else if (type === 'favorites' && id) {
                // Fetch favorites
                data = await getFavoriteCards(id);
            } else if (type === 'all' && id) {
                // Fetch all/cram
                data = await getDueCards(id, true); // forceAll=true maps to 'type=all'
            } else if (id) {
                // Standard due cards
                data = await getDueCards(id);
            } else {
                // Fallback for no ID? (Shouldn't happen with routes)
                data = await getAllDueCards();
            }

            setCards(data);
            setCurrentCardIndex(0);
        } catch (err) {
            console.error('Error loading cards:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleFavorite = async () => {
        if (!cards.length) return;
        const card = cards[currentCardIndex];

        // Optimistic update
        const updatedCards = [...cards];
        updatedCards[currentCardIndex] = { ...card, isFavorite: !card.isFavorite };
        setCards(updatedCards);

        try {
            await toggleFavorite(card.id);
        } catch (err) {
            console.error('Error toggling favorite:', err);
            // Revert on error
            updatedCards[currentCardIndex] = card;
            setCards([...updatedCards]);
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
        <Layout
            activeTab="study"
            title={
                cards.length > 0 ? (
                    <div className="capsule-counter">
                        {currentCardIndex + 1} / {cards.length}
                    </div>
                ) : null
            }
            disableScroll={true}
            headerStyle={{ marginBottom: 0, paddingBottom: 10, alignItems: 'center' }} // Align counter and settings button
            headerAction={
                <button
                    onClick={() => setShowCustomStudyModal(true)}
                    className="btn-icon-study"
                    title={t('studyOptions') || "Opciones de Estudio"}
                    style={{ transform: 'translateY(-2px)' }} // Visual optical alignment
                >
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                </button>
            }
        >
            {showCustomStudyModal && deckId && (
                <CustomStudyModal
                    deckId={deckId}
                    deckName={t('currentDeck') || "Mazo Actual"} // We might need to fetch deck name if important
                    onClose={() => setShowCustomStudyModal(false)}
                />
            )}
            {loading ? (
                <LoadingScreen />
            ) : cards.length === 0 ? (
                <div style={styles.emptyContainer}>
                    <h2 style={{ ...styles.emptyTitle, justifyContent: 'center' }}>
                        {t('allCaughtUp')}
                    </h2>
                    <div style={{ fontSize: '4rem', margin: '10px 0', animation: 'pop 0.5s ease' }}>🎉</div>
                    <p style={styles.emptyText}>{t('noCardsDue')}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', alignItems: 'center', marginTop: '20px' }}>
                        <button
                            onClick={() => loadCards(deckId, 'all')}
                            className="btn-primary"
                            style={{ width: '80%', maxWidth: '300px' }}
                        >
                            {t('studyAgain') || "Estudiar Todo de Nuevo"}
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="btn-secondary"
                            style={{ width: '80%', maxWidth: '300px' }}
                        >
                            {t('backToDecks')}
                        </button>
                    </div>
                </div>
            ) : (
                <div style={styles.container}>
                    {/* Main Study Card */}
                    <div style={styles.cardContainer}>
                        <div style={styles.card} className={`study-card ${isFlipped ? 'flipped' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
                            <div className="card-inner">
                                {/* Front */}
                                <div className="card-front">
                                    <div style={styles.cardHeader}>
                                        {/* Flip Icon - Top Left */}
                                        <div className="flip-icon" style={{ position: 'absolute', top: '10px', left: '10px', color: 'var(--accent-cyan)', opacity: 0.8, zIndex: 10 }}>
                                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                        </div>

                                        {/* Favorite Heart - Moved inside Header for Symmetry */}
                                        <div
                                            className={`favorite-icon ${triggerHeart ? 'anim-heart-pop' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setTriggerHeart(true);
                                                setTimeout(() => setTriggerHeart(false), 700);
                                                handleToggleFavorite();
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: '12px', // Visual adjustment
                                                right: '14px', // Visual adjustment (Icon is wider than flip arrow)
                                                cursor: 'pointer',
                                                zIndex: 25,
                                                color: cards[currentCardIndex].isFavorite ? '#ff4081' : 'var(--text-muted)',
                                                transition: 'color 0.3s ease'
                                            }}
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill={cards[currentCardIndex].isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth={cards[currentCardIndex].isFavorite ? "0" : "2.5"} strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                            </svg>
                                        </div>

                                        <div style={{ width: '40px' }}></div> {/* Spacer for Flip Icon */}
                                        <span className="badge">{t('question')}</span>
                                        <div style={{ width: '40px' }}></div> {/* Spacer to balance */}
                                    </div>

                                    {/* RESTORED CONTENT */}
                                    <div style={styles.cardContent} ref={frontContentRef}>
                                        <div style={styles.scrollableInner}>
                                            <h1 style={styles.questionText}>
                                                {parse(cards[currentCardIndex].front, {
                                                    replace: (domNode) => {
                                                        if (domNode.type === 'text') {
                                                            const text = domNode.data;
                                                            const soundMatch = text.match(/\[sound:(.*?)\]/);
                                                            let cleanText = text.replace(/\[sound:.*?\]/g, '');
                                                            if (cleanText.trim() === 'd') cleanText = '';
                                                            else cleanText = cleanText.replace(/\s+d\s*$/, '');

                                                            if (soundMatch) {
                                                                const filename = soundMatch[1];
                                                                const finalSrc = (filename && (filename.startsWith('http') || filename.startsWith('blob:') || filename.startsWith('data:')))
                                                                    ? filename
                                                                    : `${MEDIA_BASE_URL}/${filename}`;

                                                                const isVideo = /\.(mp4|mov|mkv|ogv)$/i.test(filename);

                                                                if (isVideo) {
                                                                    return (
                                                                        <>
                                                                            {cleanText}
                                                                            <video
                                                                                src={finalSrc}
                                                                                className="card-media"
                                                                                controls
                                                                                style={{ display: 'block', width: '100%', margin: '15px 0' }}
                                                                            />
                                                                        </>
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <>
                                                                            {cleanText}
                                                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '20px 0', position: 'relative', zIndex: 10 }} onClick={(e) => e.stopPropagation()}>
                                                                                <audio controls src={finalSrc} style={{ width: '100%' }} />
                                                                            </div>
                                                                        </>
                                                                    );
                                                                }
                                                            }
                                                            return cleanText;
                                                        }
                                                        if (domNode.type === 'tag') {
                                                            if (domNode.name === 'img') {
                                                                const src = domNode.attribs.src;
                                                                if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                                                                    domNode.attribs.src = `${MEDIA_BASE_URL}/${src}`;
                                                                    domNode.attribs.class = (domNode.attribs.class || '') + ' card-media';
                                                                    delete domNode.attribs.style;
                                                                }
                                                            }
                                                            if (domNode.name === 'audio') {
                                                                const src = domNode.attribs.src;
                                                                const finalSrc = (src && !src.startsWith('http') && !src.startsWith('data:'))
                                                                    ? `${MEDIA_BASE_URL}/${src}`
                                                                    : src;

                                                                return (
                                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '20px 0', position: 'relative', zIndex: 10 }} onClick={(e) => e.stopPropagation()}>
                                                                        <audio controls src={finalSrc} style={{ width: '100%' }} />
                                                                    </div>
                                                                );
                                                            }
                                                            if (domNode.name === 'video') {
                                                                const src = domNode.attribs.src;
                                                                if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                                                                    domNode.attribs.src = `${MEDIA_BASE_URL}/${src}`;
                                                                }
                                                                domNode.attribs.class = (domNode.attribs.class || '') + ' card-media';
                                                                domNode.attribs.controls = "true";
                                                                domNode.attribs.style = "display: block; width: 100%; margin: 10px 0;";
                                                            }
                                                        }
                                                    }
                                                })}
                                            </h1>
                                        </div>
                                    </div>

                                    {/* Card Counter Removed from here */}
                                </div>

                                {/* Back */}
                                <div className="card-back">
                                    <div style={styles.cardHeader}>
                                        <div style={{ width: '40px' }}></div>
                                        <span className="badge badge-accent">{t('answer')}</span>
                                        <div style={{ width: '40px' }}></div>
                                    </div>
                                    <div style={styles.cardContent} ref={backContentRef}>
                                        <div style={styles.scrollableInner}>
                                            <div style={styles.answerText}>
                                                {parse(cards[currentCardIndex].back, {
                                                    replace: (domNode) => {
                                                        if (domNode.type === 'text') {
                                                            const text = domNode.data;
                                                            const soundMatch = text.match(/\[sound:(.*?)\]/);
                                                            let cleanText = text.replace(/\[sound:.*?\]/g, '');
                                                            if (cleanText.trim() === 'd') cleanText = '';
                                                            else cleanText = cleanText.replace(/\s+d\s*$/, '');

                                                            if (soundMatch) {
                                                                const filename = soundMatch[1];
                                                                const finalSrc = (filename && (filename.startsWith('http') || filename.startsWith('blob:') || filename.startsWith('data:')))
                                                                    ? filename
                                                                    : `${MEDIA_BASE_URL}/${filename}`;

                                                                const isVideo = /\.(mp4|mov|mkv|ogv)$/i.test(filename);

                                                                if (isVideo) {
                                                                    return (
                                                                        <>
                                                                            {cleanText}
                                                                            <video
                                                                                src={finalSrc}
                                                                                className="card-media"
                                                                                controls
                                                                                style={{ display: 'block', width: '100%', margin: '15px 0' }}
                                                                            />
                                                                        </>
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <>
                                                                            {cleanText}
                                                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '20px 0', position: 'relative', zIndex: 10 }} onClick={(e) => e.stopPropagation()}>
                                                                                <audio controls src={finalSrc} style={{ width: '100%' }} />
                                                                            </div>
                                                                        </>
                                                                    );
                                                                }
                                                            }
                                                            return cleanText;
                                                        }
                                                        if (domNode.type === 'tag') {
                                                            if (domNode.name === 'img') {
                                                                const src = domNode.attribs.src;
                                                                if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                                                                    domNode.attribs.src = `${MEDIA_BASE_URL}/${src}`;
                                                                    domNode.attribs.class = (domNode.attribs.class || '') + ' card-media';
                                                                    delete domNode.attribs.style;
                                                                }
                                                            }
                                                            if (domNode.name === 'audio') {
                                                                const src = domNode.attribs.src;
                                                                const finalSrc = (src && !src.startsWith('http') && !src.startsWith('data:'))
                                                                    ? `${MEDIA_BASE_URL}/${src}`
                                                                    : src;

                                                                return (
                                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', margin: '20px 0', position: 'relative', zIndex: 10 }} onClick={(e) => e.stopPropagation()}>
                                                                        <audio controls src={finalSrc} style={{ width: '100%' }} />
                                                                    </div>
                                                                );
                                                            }
                                                            if (domNode.name === 'video') {
                                                                const src = domNode.attribs.src;
                                                                if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                                                                    domNode.attribs.src = `${MEDIA_BASE_URL}/${src}`;
                                                                }
                                                                domNode.attribs.class = (domNode.attribs.class || '') + ' card-media';
                                                                domNode.attribs.controls = "true";
                                                                domNode.attribs.style = "display: block; width: 100%; margin: 10px 0;";
                                                            }
                                                        }
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Flip Icon - Top Left */}
                                    <div className="flip-icon" style={{ position: 'absolute', top: '10px', left: '10px', color: 'var(--accent-cyan)', opacity: 0.8 }}>
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </div>

                                    {/* Favorite Heart - Top Right (Symmetry) */}
                                    <div
                                        className={`favorite-icon ${triggerHeart ? 'anim-heart-pop' : ''}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setTriggerHeart(true);
                                            setTimeout(() => setTriggerHeart(false), 700);
                                            handleToggleFavorite();
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            cursor: 'pointer',
                                            zIndex: 25,
                                            color: cards[currentCardIndex].isFavorite ? '#ff4081' : 'var(--text-muted)',
                                            transition: 'color 0.3s ease'
                                        }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill={cards[currentCardIndex].isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth={cards[currentCardIndex].isFavorite ? "0" : "2.5"} strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
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
        height: '100dvh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-app)',
    },
    emptyContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        textAlign: 'center',
        flex: 1,
        padding: '20px',
    },
    emptyTitle: {
        fontSize: '3rem',
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
    // Removed absolute progressCounter style
    cardContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px 16px 140px 16px', // Reduced top padding since counter is inside
        pointerEvents: 'none',
    },
    card: {
        width: '100%',
        maxWidth: '600px',
        height: '100%',
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'auto',
    },
    cardHeader: {
        marginBottom: '16px',
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '40px', // Fixed height to guard against overlap/shift
    },
    cardContent: {
        flex: 1,
        width: '100%',
        overflowY: 'auto',
        padding: '0 20px',
        minHeight: 0,
    },
    scrollableInner: {
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        paddingBottom: '20px',
        boxSizing: 'border-box',
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
        position: 'absolute',
        bottom: 'calc(60px + env(safe-area-inset-bottom))', // Pin exactly above BottomNav
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: '16px 24px',
        zIndex: 10,
        // Gradient fade to smooth out text scrolling behind it
        background: 'linear-gradient(to top, var(--bg-app) 20%, rgba(var(--bg-app-rgb), 0.8) 80%, transparent)',
        pointerEvents: 'auto',
    },
    responseButtons: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        width: '100%',
        maxWidth: '600px',
    },
};

// Internal AudioButton removed - Using shared component
export default Study;
