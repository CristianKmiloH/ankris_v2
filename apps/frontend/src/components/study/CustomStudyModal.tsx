import React from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import { useNavigate } from 'react-router-dom';

interface CustomStudyModalProps {
    deckId: string;
    deckName: string;
    onClose: () => void;
}

const { t } = useTranslation();
const navigate = useNavigate();
const [view, setView] = React.useState<'menu' | 'search'>('menu');
const [searchTerm, setSearchTerm] = React.useState('');
const [allCards, setAllCards] = React.useState<any[]>([]);
const [filteredCards, setFilteredCards] = React.useState<any[]>([]);
const [loading, setLoading] = React.useState(false);

// Import service dynamically or assuming it's available. 
// Since we can't easily add top-level imports with replace_file_content without breaking scope if not careful,
// we'll rely on the existing imports or add them if missing.
// Wait, I need to add the import for getDueCards. I will assume it is NOT imported yet.
// I will do a separate edit for imports if needed, but here I'll try to use the global scope or just assuming I'll fix imports next.
// Actually, I should use a multi-step replacement or just rewrite the file content if it's small enough.
// The file is small (134 lines). I'll use replace_file_content on the whole function body.

// Fetch cards when entering search view
React.useEffect(() => {
    if (view === 'search' && allCards.length === 0) {
        setLoading(true);
        // We need to import getDueCards. I'll add the import in a separate step or use 'require' if feasible (not in TSX usually).
        // I will assume I will add the import at the top.
        import('../../services/noteService').then(({ getDueCards }) => {
            getDueCards(deckId, true).then(cards => {
                setAllCards(cards);
                setFilteredCards(cards);
                setLoading(false);
            }).catch(err => {
                console.error("Error fetching cards for search", err);
                setLoading(false);
            });
        });
    }
}, [view, deckId, allCards.length]);

// Filter effect
React.useEffect(() => {
    if (view === 'search') {
        const lower = searchTerm.toLowerCase();
        const filtered = allCards.filter(c =>
            c.front.toLowerCase().includes(lower) ||
            c.back.toLowerCase().includes(lower)
        );
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
                            ←
                        </button>
                        <h2 style={{ ...styles.title, fontSize: '1.2rem' }}>{t('searchCards') || 'Buscar Tarjeta'}</h2>
                        <div style={{ width: 24 }} /> {/* Spacer */}
                    </div>

                    <input
                        style={styles.searchInput}
                        placeholder={t('searchPlaceholder') || "Escribe..."}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        autoFocus
                    />

                    <div style={styles.listContainer}>
                        {loading ? (
                            <p style={styles.loadingText}>Cargando...</p>
                        ) : filteredCards.length === 0 ? (
                            <p style={styles.loadingText}>{t('noResults') || "No hay resultados"}</p>
                        ) : (
                            filteredCards.map(card => (
                                <div
                                    key={card.id}
                                    style={styles.cardItem}
                                    onClick={() => handleStart('card', card.id)}
                                >
                                    <div style={styles.cardText} dangerouslySetInnerHTML={{ __html: card.front }} />
                                    <div style={{ ...styles.cardText, color: 'var(--text-secondary)', fontSize: '0.8rem' }} dangerouslySetInnerHTML={{ __html: card.back }} />
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </div>
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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    modal: {
        backgroundColor: 'rgba(23, 23, 28, 0.95)',
        backdropFilter: 'blur(24px)',
        borderRadius: '24px',
        border: '1px solid var(--border-glass)',
        boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.6)',
        padding: '32px',
        width: '100%',
        maxWidth: '400px',
        maxHeight: '80vh', // Limit height for list
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        animation: 'scaleIn 0.2s ease-out',
        overflow: 'hidden', // Contain list
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: 'var(--text-primary)',
        margin: 0,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: '1rem',
        color: 'var(--text-secondary)',
        margin: '-10px 0 10px 0',
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
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontSize: '1rem',
        fontWeight: '600',
        gap: '12px',
    },
    icon: {
        fontSize: '1.5rem',
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
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        fontSize: '0.9rem',
    },
    // New Styles for Search
    headerRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    backButton: {
        background: 'none',
        border: 'none',
        color: 'var(--text-primary)',
        fontSize: '1.5rem',
        cursor: 'pointer',
        padding: '0 8px',
    },
    searchInput: {
        padding: '12px 16px',
        borderRadius: '12px',
        backgroundColor: 'rgba(0,0,0,0.3)',
        border: '1px solid var(--border-color)',
        color: 'white',
        fontSize: '1rem',
        marginTop: '-10px',
    },
    listContainer: {
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginTop: '10px',
        minHeight: '200px', // Ensure height
    },
    cardItem: {
        padding: '12px',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: '8px',
        cursor: 'pointer',
        border: '1px solid transparent',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    cardText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '0.9rem',
    },
    loadingText: {
        color: 'var(--text-secondary)',
        textAlign: 'center',
        marginTop: '20px',
    }
};

export default CustomStudyModal;
