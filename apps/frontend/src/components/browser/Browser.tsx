import React, { useEffect, useState } from 'react';

import Layout from '../layout/Layout';
import { getDecks, type Deck } from '../../services/deckService';
import { getAllCards, type Card, updateCard, deleteCard } from '../../services/cardService';
import { useTranslation } from '../../i18n/useTranslation';
import { MEDIA_BASE_URL } from '../../config';


import EditCardModal from './EditCardModal';

// ... (ContentEditable logic can be removed if unused, or kept if used elsewhere, but we are replacing the edit modal anyway)

const Browser: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [decks, setDecks] = useState<Deck[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDeck, setSelectedDeck] = useState<string | null>(() => {
        return sessionStorage.getItem('browser_selected_deck') || null;
    });

    useEffect(() => {
        if (selectedDeck) {
            sessionStorage.setItem('browser_selected_deck', selectedDeck);
        } else {
            sessionStorage.removeItem('browser_selected_deck');
        }
    }, [selectedDeck]);

    const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useTranslation();
    const [deletingCard, setDeletingCard] = useState<Card | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [cardsData, decksData] = await Promise.all([
                getAllCards(),
                getDecks()
            ]);
            setCards(cardsData);
            setDecks(decksData);
        } catch (err) {
            console.error("Failed to fetch browser data", err);
        } finally {
            setIsLoading(false);
        }
    };

    const [editingCard, setEditingCard] = useState<Card | null>(null);
    // editFront/Back were used by inline modal, EditCardModal uses internal state initialized from card prop.

    // ...

    const handleEditClick = (card: Card, e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingCard(card);
    };



    const handleSaveEdit = async (id: string, front: string, back: string, newFiles?: { front?: File[], back?: File[] }) => {
        try {
            // Update via Service
            await updateCard(id, front, back, newFiles);

            // Optimistic update - Note: New media files won't show immediately as URL/blob until refresh unless we reconstruct logic complexity
            // But 'front'/'back' strings returned by service might contain the new tags if we returned the UPDATED card from backend.
            // Backend DOES return updated card.

            // Re-fetch or strict optimistic update?
            // Ideally we use the response from updateCard if it returns the full object.

            // Let's refetch all cards to be safe and simple, OR manually update text.
            // Text is safe to update. Media URLs might need server response.
            // Since we use the service which calls API, let's assume valid response.

            // Wait, cardService.updateCard retuns Promise<Card>. Use it!
            const updatedCard = await updateCard(id, front, back, newFiles);

            setCards(prev => prev.map(c => c.id === id ? updatedCard : c));
            setEditingCard(null);
        } catch (error) {
            console.error("Failed to update", error);
            alert("Failed to update card");
        }
    };

    const handleDeleteClick = (card: Card, e: React.MouseEvent) => {
        e.stopPropagation();
        setDeletingCard(card);
    };

    const handleConfirmDelete = async () => {
        if (!deletingCard) return;
        try {
            await deleteCard(deletingCard.id);
            // Optimistic update
            setCards(prev => prev.filter(c => c.id !== deletingCard.id));
            setDeletingCard(null);
        } catch (error) {
            console.error("Failed to delete", error);
            alert("Failed to delete card");
        }
    };

    const filteredCards = React.useMemo(() => {
        return cards.filter(card => {
            const matchesSearch = (card.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.back.toLowerCase().includes(searchTerm.toLowerCase()));

            // Ensure accurate deck ID matching (string comparison)
            const matchesDeck = selectedDeck === 'all' || String(card.deckId) === String(selectedDeck);

            return matchesSearch && matchesDeck;
        });
    }, [cards, searchTerm, selectedDeck]);

    const getDeckName = (id: string) => decks.find(d => d.id === id)?.name || 'Unknown Deck';

    const handleDeckSelect = async (deckId: string) => {
        setIsLoading(true);
        // 1. Artificial delay for visual feedback (user sees loading)
        await new Promise(resolve => setTimeout(resolve, 600));

        // 2. Set the deck (Triggers heavy filter/render)
        setSelectedDeck(deckId);

        // 3. Defer removing loading state to allow the UI to paint the spinner 
        // while the heavy filter operation runs. Breaking the batch.
        setTimeout(() => {
            setIsLoading(false);
        }, 100);
    };

    const renderCardContent = (html: string) => {
        if (!html) return null;

        // 1. EXTRACT IMAGES: Regex to find all src
        // Supports: <img src="...">
        const imgRegex = /<img[^>]+src="([^">]+)"/g;
        let imageMatches = [...html.matchAll(imgRegex)];
        let imageSrcs: string[] = [];
        let cleanText = html.replace(/<img[^>]*>/g, '').trim(); // Remove img tags for text preview

        if (imageMatches.length > 0) {
            imageMatches.forEach(match => {
                let src = match[1];
                // Fix path if it's a filename (Anki media)
                if (!src.startsWith('http') && !src.startsWith('data:')) {
                    src = `${MEDIA_BASE_URL}/${encodeURIComponent(src)}`;
                }
                imageSrcs.push(src);
            });
        }

        // 2. EXTRACT AUDIO: Regex to find [sound:...]
        // Supports: [sound:filename.mp3]
        const audioRegex = /\[sound:(.*?)\]/g;
        let audioMatches = [...html.matchAll(audioRegex)];
        let audioSrcs: string[] = [];

        // Remove sound tags from text
        cleanText = cleanText.replace(audioRegex, '').trim();

        if (audioMatches.length > 0) {
            audioMatches.forEach(match => {
                let src = match[1];
                if (!src.startsWith('http') && !src.startsWith('data:')) {
                    src = `${MEDIA_BASE_URL}/${encodeURIComponent(src)}`;
                }
                audioSrcs.push(src);
            });
        }

        // 3. TEXT ONLY (If cleanText is basically empty, show nothing or placeholder?)
        // If content was ONLY image or audio, text might be empty.

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: '100%' }}>
                {imageSrcs.length > 0 && (
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '6px',
                        marginBottom: '6px'
                    }}>
                        {imageSrcs.map((src, idx) => (
                            <div key={idx} style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                border: '2px solid var(--accent-cyan)',
                                backgroundColor: '#000',
                                flexShrink: 0,
                                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                            }}>
                                <img
                                    src={src}
                                    alt={`thumbnail-${idx}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* Audio Players - Standard HTML5 to match Study Mode */}
                {audioSrcs.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', alignItems: 'center', marginBottom: '8px' }}>
                        {audioSrcs.map((src, idx) => (
                            <audio
                                key={idx}
                                controls
                                src={src}
                                style={{ width: '100%', height: '36px', maxWidth: '100%' }}
                                onClick={(e) => e.stopPropagation()}
                            />
                        ))}
                    </div>
                )}

                {/* Render Text Content (without images/audio tags) - Content grows naturally */}
                {cleanText && (
                    <div
                        className="card-text-content"
                        dangerouslySetInnerHTML={{ __html: cleanText }}
                        style={{
                            width: '100%',
                            textAlign: 'center',
                            padding: '0 4px',
                            fontSize: '0.95em',
                            lineHeight: '1.4',
                        }}
                    />
                )}
            </div>
        );
    };

    return (
        <Layout
            activeTab="library"
            title={t('myCards') || "Mis Tarjetas"}
            subtitle={t('exploreCards')}
            showBackButton={true}
            disableScroll={true}
            headerStyle={{ padding: '16px 16px 0 16px', marginBottom: '8px' }}
        >
            <div style={{ ...styles.container, padding: '0 16px 16px 16px' }}>
                {/* Loading Modal */}
                {isLoading && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.loadingBox}>
                            <span className="loading-spin" style={{ fontSize: '3rem' }}>⏳</span>
                            <p style={styles.loadingText}>{t('loadingCards') || 'Cargando tarjetas...'}</p>
                        </div>
                    </div>
                )}

                {/* Top Section: Search & Decks (Max 40%) */}
                <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={styles.searchBox}>
                        <input
                            type="text"
                            placeholder={t('searchCards')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px' }}>
                        <button
                            className={selectedDeck === 'all' ? 'btn-primary' : 'btn-glass'}
                            style={{
                                ...styles.deckButton,
                                width: '100%',
                                marginBottom: '8px',
                            }}
                            onClick={() => handleDeckSelect('all')}
                        >
                            {t('allDecks')}
                        </button>

                        <div style={styles.deckButtons}>
                            {decks.map(deck => (
                                <button
                                    key={deck.id}
                                    className={selectedDeck === deck.id ? 'btn-primary' : 'btn-glass'}
                                    style={styles.deckButton}
                                    onClick={() => handleDeckSelect(deck.id)}
                                >
                                    {deck.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Cards (60% / Remaining) */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingTop: '10px' }}>
                    <div style={styles.resultsHeader}>
                        <h2 style={styles.resultsTitle}>{t('cardsTitle')} ({filteredCards.length})</h2>
                        <span style={styles.hint}>💡 {t('clickToFlip')}</span>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px', paddingBottom: '120px', scrollbarWidth: 'thin' }}>
                        {selectedDeck === null ? (
                            <div style={styles.noSelectionState}>
                                <span style={{ fontSize: '3rem' }}>👆</span>
                                <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}>
                                    {t('pleaseSelectDeck') || "Por favor selecciona un mazo para ver sus tarjetas"}
                                </p>
                            </div>
                        ) : (
                            <div style={styles.cardsGrid}>
                                {filteredCards.length > 0 ? (
                                    filteredCards.map(card => {
                                        const isFlipped = flippedCardId === card.id;
                                        return (
                                            <div
                                                key={card.id}
                                                className={`browser-card-row ${isFlipped ? 'flipped' : ''}`}
                                                onClick={() => setFlippedCardId(isFlipped ? null : card.id)}
                                                style={{
                                                    ...styles.cardRow,
                                                    height: '150px', // Reduced Height
                                                }}
                                            >
                                                <div className="card-inner" style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)', willChange: 'transform' }}>

                                                    {/* FRONT FACE */}
                                                    <div className="card-front" style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', borderRadius: '24px', backgroundColor: 'var(--bg-card)', padding: '10px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border-glass)' }}>
                                                        <div style={styles.cardHeader}>
                                                            <span style={styles.badge}>{t('question')}</span>
                                                            <svg className="card-flip-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: 20, height: 20, transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                            </svg>
                                                        </div>
                                                        <div style={{ ...styles.cardBody, minHeight: 0, overflow: 'hidden' }}>
                                                            <div style={{ width: '100%', height: '100%', overflowY: 'auto', paddingRight: '4px', display: 'flex', flexDirection: 'column' }}>
                                                                <div
                                                                    style={{ ...styles.cardText, height: 'auto', overflowY: 'visible', margin: 'auto 0' }}
                                                                >
                                                                    {renderCardContent(card.front)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={styles.cardFooter}>
                                                            <div style={{ display: 'flex' }}>
                                                                <button
                                                                    style={styles.editButton}
                                                                    onClick={(e) => handleEditClick(card, e)}
                                                                    title={t('editCard') || 'Edit'}
                                                                >
                                                                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                                    </svg>
                                                                </button>
                                                                <button
                                                                    style={styles.deleteButton}
                                                                    onClick={(e) => handleDeleteClick(card, e)}
                                                                    title={t('deleteCard') || 'Delete'}
                                                                >
                                                                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18" style={{ overflow: 'visible' }}>
                                                                        <defs>
                                                                            <radialGradient id={`trashLight-${card.id}`} cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
                                                                                <stop offset="0%" stopColor="#FFF" stopOpacity="0.9" />
                                                                                <stop offset="40%" stopColor="var(--accent-red)" stopOpacity="0.8" />
                                                                                <stop offset="100%" stopColor="var(--accent-red)" stopOpacity="0" />
                                                                            </radialGradient>
                                                                        </defs>
                                                                        <ellipse cx="12" cy="10" rx="4" ry="2" fill={`url(#trashLight-${card.id})`} opacity="0" />
                                                                        <path fill="var(--bg-card)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7M10 11v6M14 11v6" />
                                                                        <path fill="var(--bg-card)" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                            <span style={styles.deckBadge}>{getDeckName(card.deckId)}</span>
                                                        </div>
                                                    </div>

                                                    {/* BACK FACE */}
                                                    <div className="card-back" style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', borderRadius: '24px', backgroundColor: 'var(--bg-card-elevated)', padding: '10px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transform: 'rotateY(180deg)', border: '1px solid var(--border-glass)' }}>
                                                        <div style={styles.cardHeader}>
                                                            <span style={{ ...styles.badge, backgroundColor: 'var(--accent-cyan)', color: '#000' }}>{t('answer')}</span>
                                                            <svg className="card-flip-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: 20, height: 20, transform: 'rotate(180deg)', opacity: 1, transition: 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                            </svg>
                                                        </div>
                                                        <div style={{ ...styles.cardBody, minHeight: 0, overflow: 'hidden' }}>
                                                            <div style={{ width: '100%', height: '100%', overflowY: 'auto', paddingRight: '4px', display: 'flex', flexDirection: 'column' }}>
                                                                <div
                                                                    style={{ ...styles.cardText, fontWeight: '700', fontSize: '1.25rem', height: 'auto', overflowY: 'visible', margin: 'auto 0' }}
                                                                >
                                                                    {renderCardContent(card.back)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={styles.cardFooter}>
                                                            <span style={{ ...styles.deckBadge, backgroundColor: 'rgba(0,0,0,0.1)', color: 'rgba(0,0,0,0.5)' }}>{getDeckName(card.deckId)}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div style={styles.emptyState}>
                                        <p style={styles.emptyText}>{t('noCardsFound')}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* EDIT MODAL */}
            {editingCard && (
                <EditCardModal
                    card={editingCard}
                    onClose={() => setEditingCard(null)}
                    onSave={handleSaveEdit}
                />
            )}

            {/* DELETE MODAL */}
            {deletingCard && (
                <div style={styles.modalOverlay}>
                    <div style={styles.deleteModal}>
                        <h3 style={styles.deleteTitle}>{t('deleteCard')}?</h3>
                        <p style={styles.deleteMessage}>{t('deleteConfirm') || "¿Estás seguro de eliminar esta tarjeta?"}</p>
                        <div style={styles.deleteActions}>
                            <button onClick={() => setDeletingCard(null)} style={styles.cancelButton}>
                                {t('cancel')}
                            </button>
                            <button onClick={handleConfirmDelete} style={styles.confirmButton}>
                                {t('delete')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout >
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    fixedHeader: {
        flexShrink: 0,
        marginBottom: '0px', // Further reduced
    },
    scrollableContent: {
        flex: 1,
        overflowY: 'auto',
        paddingBottom: '20px',
        scrollbarWidth: 'none',
    },
    searchBox: {
        marginBottom: '8px',
    },
    searchInput: {
        width: '100%',
        padding: '16px 20px',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--text-muted)', // Visible border
        borderRadius: '16px',
        color: 'var(--text-primary)', // Visible text
        fontSize: '1rem',
    },
    deckFilters: {
        marginBottom: '16px',
    },
    deckButtons: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap', // Wrap instead of scroll
        marginBottom: '8px',
    },
    // Visual styles handled by .btn-glass / .btn-primary in CSS
    deckButton: {
        padding: '10px 20px', // More padding for nicer hit target
        fontSize: '0.875rem',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        fontWeight: '600',
        flexGrow: 1, // Allow buttons to fill space evenly
        textAlign: 'center' as const,
        minWidth: 'auto', // Let content define width
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(10px)',
        color: 'var(--text-primary)', // Force high contrast text
    },
    deckButtonActive: {
        background: 'linear-gradient(135deg, var(--accent-cyan), #00b8e6)',
        color: '#000',
        fontWeight: '700',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 12px rgba(0, 230, 255, 0.4), inset 0 2px 4px rgba(255,255,255,0.4)',
        transform: 'translateY(-1px)',
    },
    resultsHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    resultsTitle: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
    },
    hint: {
        fontSize: '0.875rem',
        color: 'var(--accent-cyan)',
    },
    cardsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '16px',
        width: '100%',
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    badge: {
        fontSize: '0.65rem',
        fontWeight: '700',
        padding: '4px 8px',
        borderRadius: '6px',
        letterSpacing: '0.5px',
    },
    cardBody: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: 0, // Critical for nested flex scrolling
        overflow: 'hidden', // Contain the scrollable text
        padding: '2px 0',
    },
    cardFooter: {
        width: '100%',
        paddingTop: '4px',
        textAlign: 'right',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0, // Don't shrink footer
    },
    cardRow: {
        // Base styles for the flippable container if not handled by CSS class
    },
    cardText: {
        fontSize: '1.1rem',
        textAlign: 'center',
        lineHeight: '1.4',
        width: '100%',
        height: '100%', // Fill the body
        overflowY: 'auto', // Scroll ONLY here
        padding: '0 4px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center content safely
        justifyContent: 'center', // Center content if short
        scrollbarWidth: 'thin',
    },
    deckBadge: {
        fontSize: '0.7rem',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        padding: '6px 12px',
        borderRadius: '20px',
        backgroundColor: 'var(--bg-glass)',
        color: 'var(--text-secondary)',
        display: 'inline-block'
    },
    editButton: {
        width: '32px',
        height: '32px',
        minWidth: 'unset', // Force reset
        flex: '0 0 auto', // Prevent stretching
        padding: 0,
        borderRadius: '50%',
        border: '1px solid rgba(0, 217, 255, 0.3)',
        backgroundColor: 'rgba(0, 217, 255, 0.1)',
        color: 'var(--accent-cyan)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        marginRight: '8px',
    },
    deleteButton: {
        width: '32px',
        height: '32px',
        minWidth: 'unset', // Force reset
        flex: '0 0 auto', // Prevent stretching
        padding: 0,
        borderRadius: '50%',
        border: '1px solid rgba(139, 46, 58, 0.3)',
        backgroundColor: 'rgba(139, 46, 58, 0.1)',
        color: 'var(--accent-red)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    // Add Modal Styles
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999, // Ensure on top
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    modalContent: {
        backgroundColor: 'rgba(23, 23, 28, 0.95)',
        backdropFilter: 'blur(24px)',
        borderRadius: '28px',
        border: '1px solid var(--border-glass)',
        boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255,255,255,0.06)',
        padding: '32px',
        width: '90%', // Responsive width
        maxWidth: '800px', // Much wider as requested
        height: '85vh', // FIXED height. Keeps boxes equal size always.
        overflow: 'hidden', // PREVENT outer scroll, force inner content to fit
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    modalTitle: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: 'var(--text-primary)',
        margin: 0,
        textAlign: 'center',
        letterSpacing: '-0.02em',
    },
    label: {
        fontSize: '0.75rem',
        fontWeight: '700',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        marginBottom: '6px',
        display: 'block',
        marginLeft: '4px',
    },
    textarea: {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '16px',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        lineHeight: '1.5',
        resize: 'none',
        outline: 'none',
        transition: 'all 0.2s',
        minHeight: '100px', // Smaller min height to allow flex to shrink if needed
        height: '100%', // Take full available height in flex container
        overflowY: 'auto', // Force internal scroll
        fontFamily: 'inherit',
        flex: 1, // Grow to fill space
    },
    modalActions: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'center', // Centered
        marginTop: '12px',
    },
    cancelButton: {
        padding: '12px 24px',
        borderRadius: '30px', // Uniform pill shape
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        color: 'var(--text-secondary)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        fontWeight: '600',
        fontSize: '0.95rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
    },
    deleteModal: {
        backgroundColor: 'rgba(23, 23, 28, 0.95)',
        backdropFilter: 'blur(24px)',
        borderRadius: '28px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.6)',
        padding: '40px 32px',
        width: '100%',
        maxWidth: '420px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
    },
    deleteTitle: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#fff',
        margin: 0,
    },
    deleteMessage: {
        fontSize: '1rem',
        color: 'var(--text-secondary)',
        margin: 0,
        lineHeight: '1.5',
        marginBottom: '16px',
    },
    deleteActions: {
        display: 'flex',
        gap: '12px',
        width: '100%',
        justifyContent: 'center',
    },
    confirmButton: {
        padding: '12px 24px',
        borderRadius: '30px', // Uniform pill shape
        backgroundColor: 'rgba(220, 38, 38, 0.15)',
        color: '#ff4d4d',
        border: '1px solid rgba(220, 38, 38, 0.3)',
        fontWeight: '600',
        fontSize: '0.95rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 0 20px rgba(220, 38, 38, 0.1)',
        flex: 1,
    },
    emptyState: {
        gridColumn: '1 / -1',
        padding: '48px',
        textAlign: 'center',
        backgroundColor: 'var(--bg-card)',
        borderRadius: '24px',
    },
    emptyText: {
        color: 'var(--text-secondary)',
        fontSize: '1.125rem',
    },
    loadingBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        padding: '40px',
        backgroundColor: 'var(--bg-card)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
    },
    loadingText: {
        fontSize: '1.2rem',
        color: 'var(--text-primary)',
        fontWeight: 'bold',
    },
    noSelectionState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textAlign: 'center',
        opacity: 0.7,
        padding: '2rem',
    }
};

export default Browser;
