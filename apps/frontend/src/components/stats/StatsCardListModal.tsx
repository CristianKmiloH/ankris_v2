import React, { useMemo, useState } from 'react';
import { Card } from '../../services/cardService';
import { useTranslation } from '../../i18n/useTranslation';
import parse from 'html-react-parser';

interface StatsCardListModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    cards: Card[];
    onSelectCard: (card: Card) => void;
}

const StatsCardListModal: React.FC<StatsCardListModalProps> = ({ isOpen, onClose, title, cards, onSelectCard }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCards = useMemo(() => {
        if (!searchTerm) return cards;
        const lower = searchTerm.toLowerCase();
        return cards.filter(c =>
            c.front.toLowerCase().includes(lower) ||
            c.back.toLowerCase().includes(lower)
        );
    }, [cards, searchTerm]);

    if (!isOpen) return null;

    return (
        <div style={styles.overlay} onClick={onClose} className="fade-in">
            <div style={styles.modal} onClick={e => e.stopPropagation()} className="slide-up">

                {/* Header */}
                <div style={styles.header}>
                    <h2 style={styles.title}>{title} ({cards.length})</h2>
                    <button onClick={onClose} style={styles.closeButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Search (Optional but good for UX) */}
                <div style={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder={t('search') || 'Search...'}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>

                {/* List */}
                <div style={styles.listContainer}>
                    {filteredCards.length === 0 ? (
                        <div style={styles.emptyState}>No cards found</div>
                    ) : (
                        filteredCards.map(card => (
                            <div
                                key={card.id}
                                style={styles.cardItem}
                                onClick={() => onSelectCard(card)}
                            >
                                <div style={styles.cardContent}>
                                    <div style={styles.cardFront}>
                                        {parse(card.front.replace(/\[sound:.*?\]/g, '').substring(0, 50) + (card.front.length > 50 ? '...' : ''))}
                                    </div>
                                    <div style={styles.cardBack}>
                                        {parse(card.back.replace(/\[sound:.*?\]/g, '').substring(0, 50) + (card.back.length > 50 ? '...' : ''))}
                                    </div>
                                </div>
                                <div style={styles.chevron}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 18l6-6-6-6" />
                                    </svg>
                                </div>
                            </div>
                        ))
                    )}
                </div>

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
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    modal: {
        backgroundColor: '#1E1E1E',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '500px',
        height: '80vh',
        maxHeight: '800px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    header: {
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    },
    title: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: 'var(--text-primary)',
        margin: 0,
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        padding: '4px',
    },
    searchContainer: {
        padding: '16px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    },
    searchInput: {
        width: '100%',
        padding: '12px 16px',
        borderRadius: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        outline: 'none',
    },
    listContainer: {
        flex: 1,
        overflowY: 'auto',
        padding: '16px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    cardItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '12px',
        padding: '16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background-color 0.2s',
        border: '1px solid rgba(255,255,255,0.05)',
    },
    cardContent: {
        flex: 1,
        marginRight: '12px',
        overflow: 'hidden',
    },
    cardFront: {
        color: 'var(--text-primary)',
        fontWeight: '600',
        marginBottom: '4px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    cardBack: {
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    chevron: {
        color: 'var(--text-muted)',
    },
    emptyState: {
        textAlign: 'center',
        color: 'var(--text-muted)',
        marginTop: '40px',
    }
};

export default StatsCardListModal;
