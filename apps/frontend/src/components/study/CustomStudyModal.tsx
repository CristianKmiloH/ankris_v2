import React from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import { useNavigate } from 'react-router-dom';
import { getDueCards } from '../../services/noteService';

interface CustomStudyModalProps {
    deckId: string;
    deckName: string;
    onClose: () => void;
}

// Helper to clean up card content for preview
const stripHtml = (html: string) => {
    if (!html) return '';

    let text = html;

    // Remove [sound:...] tags
    text = text.replace(/\[sound:.*?\]/g, '');

    // Check for images
    const hasImage = /<img[^>]*>/i.test(text);

    // Replace BLOCK tags (opening and closing) with spaces to ensure separation
    // divs, p, br, li, h1-6, tr, etc.
    text = text.replace(/<(div|p|br|li|h[1-6]|tr|table|ul|ol)[^>]*>/gi, ' ');
    text = text.replace(/<\/(div|p|br|li|h[1-6]|tr|table|ul|ol)>/gi, ' ');

    // Remove all remaining tags
    text = text.replace(/<[^>]*>/g, '');

    // Replace entities
    text = text.replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"');

    // Normalize whitespace
    text = text.replace(/\s+/g, ' ').trim();

    if (!text && hasImage) return '📷 [Imagen]';
    if (!text) return '...';

    return text;
};



const CustomStudyModal: React.FC<CustomStudyModalProps> = ({ deckId, deckName, onClose }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [view, setView] = React.useState<'menu' | 'search'>('menu');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [allCards, setAllCards] = React.useState<any[]>([]);
    const [filteredCards, setFilteredCards] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);

    // Fetch cards when entering search view
    React.useEffect(() => {
        if (view === 'search' && allCards.length === 0) {
            setLoading(true);
            getDueCards(deckId, true).then(cards => {
                setAllCards(cards);
                setFilteredCards(cards);
                setLoading(false);
            }).catch(err => {
                console.error("Error fetching cards for search", err);
                setLoading(false);
            });
        }
    }, [view, deckId, allCards.length]);

    // Filter effect
    React.useEffect(() => {
        if (view === 'search') {
            const lower = searchTerm.toLowerCase();
            const filtered = allCards.filter(c => {
                // Search in raw content (including hidden structure) or stripped content? 
                // Usually raw is safer to find specific things, but for user experience stripped might be better.
                // Let's search in stripped content to match what they see, OR simple raw text search.
                return c.front.toLowerCase().includes(lower) ||
                    c.back.toLowerCase().includes(lower);
            });
            setFilteredCards(filtered);
        }
    }, [searchTerm, allCards, view]);

    const handleStart = (type: string, cardId?: string) => {
        if (type === 'standard') {
            navigate(`/decks/${deckId}/study`);
        } else if (type === 'card' && cardId) {
            // Use navigate with unique timestamp and force reload in key prop if needed
            // This fixes the 'Not Found' error by staying within client-side routing
            const timestamp = Date.now();
            navigate(`/decks/${deckId}/study?type=card&cardId=${cardId}&_t=${timestamp}`, { replace: true });
        } else {
            navigate(`/decks/${deckId}/study?type=${type}`);
        }
        onClose();
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                {view === 'menu' ? (
                    <>
                        <h2 style={styles.title}>{t('customStudy') || 'Estudio Personalizado'}</h2>
                        <p style={styles.subtitle}>{deckName}</p>

                        <div style={styles.optionsGrid}>
                            <button style={styles.optionButton} onClick={() => handleStart('standard')}>
                                <span style={styles.icon}>📅</span>
                                <span style={styles.label}>{t('studyDue') || 'Estudiar Pendientes'}</span>
                            </button>

                            <button style={styles.optionButton} onClick={() => handleStart('favorites')}>
                                <span style={styles.icon}>❤️</span>
                                <span style={styles.label}>{t('studyFavorites') || 'Estudiar Favoritos'}</span>
                            </button>

                            <button style={styles.optionButton} onClick={() => handleStart('all')}>
                                <span style={styles.icon}>📚</span>
                                <span style={styles.label}>{t('cramAll') || 'Repasar Todo (Cram)'}</span>
                            </button>

                            <button style={styles.optionButton} onClick={() => setView('search')}>
                                <span style={styles.icon}>🔍</span>
                                <span style={styles.label}>{t('searchCards') || 'Buscar Tarjeta'}</span>
                            </button>
                        </div>

                        <button style={styles.cancelButton} onClick={onClose}>
                            {t('cancel')}
                        </button>
                    </>
                ) : (
                    <>
                        <div style={styles.headerRow}>
                            <div style={styles.backButtonWrapper}>
                                <button
                                    style={{
                                        ...styles.backButton,
                                        width: '40px',
                                        height: '40px',
                                        minWidth: '40px',
                                        borderRadius: '50%',
                                        flex: '0 0 40px',
                                        aspectRatio: '1 / 1'
                                    }}
                                    onClick={() => setView('menu')}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                </button>
                            </div>
                            <h2 style={styles.searchTitle}>{t('searchCards') || 'Buscador de Cartas'}</h2>
                            <div style={{ width: 44, flex: '0 0 44px' }} /> {/* Spacer */}
                        </div>

                        <div style={styles.searchContainer}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={styles.searchIcon}>
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input
                                style={styles.searchInput}
                                placeholder={t('searchPlaceholder') || "Escribe para buscar..."}
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                        </div>

                        <div style={styles.listContainer}>
                            {loading ? (
                                <div style={styles.loadingContainer}>
                                    <div className="spinner" style={{ border: '3px solid rgba(255,255,255,0.1)', borderTop: '3px solid var(--accent-cyan)', borderRadius: '50%', width: '24px', height: '24px', animation: 'spin 1s linear infinite' }}></div>
                                    <span style={styles.loadingText}>Cargando...</span>
                                </div>
                            ) : filteredCards.length === 0 ? (
                                <div style={styles.emptyState}>
                                    <span style={{ fontSize: '2rem', marginBottom: '10px', opacity: 0.5 }}>🔍</span>
                                    <p style={styles.loadingText}>{t('noResults') || "No hay resultados"}</p>
                                </div>
                            ) : (
                                filteredCards.map((card, index) => (
                                    <div
                                        key={card.id || index}
                                        style={styles.cardItem}
                                        className="card-item-hover"
                                        onClick={() => handleStart('card', card.id)}
                                    >
                                        <div style={styles.cardContent}>
                                            <div style={styles.cardFrontRow}>
                                                <span style={styles.qBadge}>Q</span>
                                                <span style={styles.cardFrontText}>{stripHtml(card.front)}</span>
                                            </div>
                                            <div style={styles.cardBackRow}>
                                                <span style={styles.aBadge}>A</span>
                                                <span style={styles.cardBackText}>{stripHtml(card.back)}</span>
                                            </div>
                                        </div>
                                        <div style={styles.playAction}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" opacity='0.2' />
                                                <polygon points="10 8 16 12 10 16 10 8" fill="var(--accent-cyan)" />
                                            </svg>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}
            </div>
            <style>{`
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .card-item-hover:hover {
                    background-color: rgba(255, 255, 255, 0.08) !important;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    border-color: rgba(255, 255, 255, 0.1) !important;
                }
                .card-item-hover:active {
                    transform: scale(0.98);
                }
            `}</style>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker overlay
        backdropFilter: 'blur(16px)', // Stronger blur
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    modal: {
        background: 'linear-gradient(180deg, rgba(30, 30, 35, 0.9) 0%, rgba(20, 20, 25, 0.95) 100%)', // Gradient BG
        borderRadius: '32px',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.9), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
        padding: '32px',
        width: '100%',
        maxWidth: '400px',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy animation
        overflow: 'hidden',
    },
    title: {
        fontSize: '1.75rem',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #fff 0%, #ccc 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        margin: '0 0 4px 0',
        textAlign: 'center',
        letterSpacing: '-0.02em',
    },
    subtitle: {
        fontSize: '0.9rem',
        color: 'var(--accent-cyan)',
        margin: '0 0 12px 0',
        textAlign: 'center',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        opacity: 0.9,
    },
    optionsGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    optionButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '16px 20px',
        // Glassmorphism button
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '24px',
        color: 'white',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
        fontSize: '1rem',
        fontWeight: '600',
        gap: '16px',
        textAlign: 'left',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    icon: {
        fontSize: '1.6rem',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
    },
    label: {
        flex: 1,
        textAlign: 'left',
        letterSpacing: '0.3px',
    },
    cancelButton: {
        padding: '14px',
        borderRadius: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)', // Slight bg for visibility
        border: '1px solid rgba(255, 255, 255, 0.05)',
        color: 'rgba(255, 255, 255, 0.8)', // Much brighter
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '700',
        marginTop: '8px',
        transition: 'all 0.2s ease',
        letterSpacing: '0.5px',
    },
    // Search Styles (Kept mostly similar but aligned)
    headerRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: '8px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        marginBottom: '8px',
    },
    backButtonWrapper: {
        width: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    backButton: {
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '50%',
        color: 'white',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        padding: 0,
    },
    searchTitle: {
        fontSize: '1.1rem',
        fontWeight: '700',
        color: 'white',
        margin: 0,
        textAlign: 'center',
        flex: 1,
    },
    searchContainer: {
        position: 'relative',
        width: '100%',
        marginBottom: '4px',
    },
    searchIcon: {
        position: 'absolute',
        left: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        opacity: 0.7,
        color: 'var(--accent-cyan)',
    },
    searchInput: {
        width: '100%',
        padding: '14px 14px 14px 48px',
        borderRadius: '20px',
        backgroundColor: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'white',
        fontSize: '0.95rem',
        outline: 'none',
        transition: 'all 0.2s',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
    },
    listContainer: {
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginTop: '8px',
        minHeight: '200px',
        paddingRight: '4px',
        paddingBottom: '10px',
    },
    cardItem: {
        padding: '16px',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: '18px',
        cursor: 'pointer',
        border: '1px solid rgba(255,255,255,0.04)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
        position: 'relative',
    },
    cardContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        overflow: 'hidden',
    },
    cardFrontRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    cardBackRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    qBadge: {
        fontSize: '0.7rem',
        fontWeight: '800',
        color: 'var(--accent-cyan)',
        backgroundColor: 'rgba(0, 255, 255, 0.1)',
        padding: '2px 6px',
        borderRadius: '6px',
        minWidth: '20px',
        textAlign: 'center',
    },
    aBadge: {
        fontSize: '0.7rem',
        fontWeight: '800',
        color: 'var(--text-secondary)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '2px 6px',
        borderRadius: '6px',
        minWidth: '20px',
        textAlign: 'center',
    },
    cardFrontText: {
        fontSize: '0.95rem',
        fontWeight: '600',
        color: 'white',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    cardBackText: {
        fontSize: '0.9rem',
        color: 'rgba(255,255,255,0.6)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    playAction: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--accent-cyan)',
        opacity: 0.8,
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        gap: '12px',
        padding: '40px',
    },
    loadingText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: '0.9rem',
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        padding: '40px',
    },
};

export default CustomStudyModal;
