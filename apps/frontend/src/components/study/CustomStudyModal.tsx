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

    // Remove [sound:...] tags
    let text = html.replace(/\[sound:.*?\]/g, '');

    // Check for images before stripping tags to indicate presence
    const hasImage = /<img[^>]*>/i.test(text);

    // Remove HTML tags
    text = text.replace(/<[^>]*>/g, '');

    // Replace common entities
    text = text.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

    // Trim whitespace
    text = text.trim();

    // If text is empty but had image, return placeholder
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
            navigate(`/decks/${deckId}/study?type=card&cardId=${cardId}`);
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
                            <button style={styles.backButton} onClick={() => setView('menu')}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <h2 style={{ ...styles.title, fontSize: '1.2rem', flex: 1, textAlign: 'center', marginRight: '32px' }}>{t('searchCards') || 'Buscar Tarjeta'}</h2>
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
                                    <span style={{ fontSize: '2rem', marginBottom: '10px' }}>🤷‍♂️</span>
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
                                        <div style={styles.cardFront}>{stripHtml(card.front)}</div>
                                        <div style={styles.cardBack}>{stripHtml(card.back)}</div>
                                        <div style={styles.cardArrow}>→</div>
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
                    transform: translateY(-1px);
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(12px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    modal: {
        backgroundColor: '#1E1E24', // Solid dark premium background
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 32px 64px -16px rgba(0, 0, 0, 0.8)',
        padding: '24px', // Slightly tighter padding
        width: '100%',
        maxWidth: '420px',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        animation: 'scaleIn 0.2s ease-out',
        overflow: 'hidden',
    },
    title: {
        fontSize: '1.4rem',
        fontWeight: '700',
        color: 'white',
        margin: 0,
        textAlign: 'center',
        letterSpacing: '-0.02em',
    },
    subtitle: {
        fontSize: '0.95rem',
        color: 'rgba(255,255,255,0.5)',
        margin: '-12px 0 8px 0',
        textAlign: 'center',
    },
    optionsGrid: {
        display: 'grid',
        gap: '12px',
    },
    optionButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '16px',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)',
        fontSize: '1rem',
        fontWeight: '600',
        gap: '12px',
    },
    icon: {
        fontSize: '1.4rem',
    },
    label: {
        flex: 1,
        textAlign: 'left',
    },
    cancelButton: {
        padding: '12px',
        borderRadius: '12px',
        backgroundColor: 'transparent',
        border: 'none',
        color: 'rgba(255,255,255,0.4)',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '500',
        marginTop: '8px',
    },
    // Search Styles
    headerRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '4px',
    },
    backButton: {
        background: 'rgba(255,255,255,0.05)',
        border: 'none',
        borderRadius: '10px',
        color: 'white',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background 0.2s',
    },
    searchContainer: {
        position: 'relative',
        width: '100%',
    },
    searchIcon: {
        position: 'absolute',
        left: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
    },
    searchInput: {
        width: '100%',
        padding: '14px 14px 14px 44px',
        borderRadius: '14px',
        backgroundColor: 'rgba(0,0,0,0.25)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: 'white',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    listContainer: {
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginTop: '4px',
        minHeight: '200px',
        paddingRight: '4px', // For scrollbar
    },
    cardItem: {
        padding: '16px',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: '16px',
        cursor: 'pointer',
        border: '1px solid rgba(255,255,255,0.03)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transition: 'all 0.2s ease',
        position: 'relative',
    },
    cardFront: {
        fontSize: '1rem',
        fontWeight: '600',
        color: 'white',
        flex: 1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    cardBack: {
        fontSize: '0.85rem',
        color: 'rgba(255,255,255,0.5)',
        flex: 1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'right',
    },
    cardArrow: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: '1.2rem',
        lineHeight: 1,
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
