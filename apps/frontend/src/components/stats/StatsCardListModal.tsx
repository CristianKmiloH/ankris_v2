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
    accentColor?: string;
}

const StatsCardListModal: React.FC<StatsCardListModalProps> = ({
    isOpen,
    onClose,
    title,
    cards,
    onSelectCard,
    accentColor = 'var(--text-primary)'
}) => {
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
            <div
                style={{
                    ...styles.modal,
                    boxShadow: `0 25px 50px -12px ${accentColor}`,
                    borderColor: `${accentColor}33` // 20% opacity
                }}
                onClick={e => e.stopPropagation()}
                className="slide-up"
            >

                {/* Header */}
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {/* Status Indicator Dot */}
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }}></div>
                        <h2 style={{ ...styles.title, color: accentColor }}>{title}</h2>
                        <span style={styles.countBadge}>{cards.length}</span>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Search */}
                <div style={styles.searchContainer}>
                    <div style={styles.inputWrapper}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{ marginLeft: '12px' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder={t('search') || 'Buscar...'}
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                </div>

                {/* List */}
                <div style={styles.listContainer}>
                    {filteredCards.length === 0 ? (
                        <div style={styles.emptyState}>
                            <p>No se encontraron tarjetas</p>
                        </div>
                    ) : (
                        filteredCards.map(card => (
                            <div
                                key={card.id}
                                style={styles.cardItem}
                                onClick={() => onSelectCard(card)}
                                className="card-item-hover"
                            >
                                <div style={styles.cardContent}>
                                    <div style={styles.cardFront}>
                                        {parse(card.front.replace(/\[sound:.*?\]/g, '').substring(0, 80) + (card.front.length > 80 ? '...' : ''))}
                                    </div>
                                    <div style={styles.cardBack}>
                                        {parse(card.back.replace(/\[sound:.*?\]/g, '').substring(0, 80) + (card.back.length > 80 ? '...' : ''))}
                                    </div>
                                </div>
                                <div style={{ ...styles.actionIcon, color: accentColor }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)', // Dark premium overlay
        backdropFilter: 'blur(12px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    modal: {
        backgroundColor: '#18181b', // Zinc-900 like
        borderRadius: '24px', // Modern but not too round
        width: '100%',
        maxWidth: '500px', // Slightly wider
        height: '85vh',
        maxHeight: '800px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    },
    header: {
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        background: 'rgba(255, 255, 255, 0.02)',
        flexShrink: 0,
    },
    title: {
        fontSize: '1.25rem',
        fontWeight: '700',
        margin: 0,
        letterSpacing: '-0.01em',
    },
    countBadge: {
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '2px 8px',
        borderRadius: '8px',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: 'var(--text-secondary)',
    },
    closeButton: {
        background: 'rgba(255, 255, 255, 0.05)',
        border: 'none',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        width: '32px',
        height: '32px',
        borderRadius: '10px', // Square-ish rounded
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
    },
    searchContainer: {
        padding: '16px 24px',
        flexShrink: 0,
    },
    inputWrapper: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '14px', // Standard rounded input
        border: '1px solid rgba(255, 255, 255, 0.08)',
        overflow: 'hidden',
        transition: 'border-color 0.2s',
    },
    searchInput: {
        flex: 1,
        padding: '12px 14px',
        background: 'transparent',
        border: 'none',
        color: 'var(--text-primary)',
        fontSize: '0.95rem',
        outline: 'none',
        fontWeight: '500',
    },
    listContainer: {
        flex: 1,
        overflowY: 'auto',
        padding: '0 24px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        scrollbarWidth: 'none',
    },
    cardItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '16px', // Reduced from 20px
        padding: '16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
        border: '1px solid transparent',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '70px',
    },
    cardContent: {
        flex: 1,
        marginRight: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        overflow: 'hidden',
    },
    cardFront: {
        color: 'var(--text-primary)',
        fontSize: '1rem',
        fontWeight: '600',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    cardBack: {
        color: 'var(--text-secondary)',
        fontSize: '0.85rem',
        fontWeight: '400',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        opacity: 0.7,
    },
    actionIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.05)',
        width: '32px',
        height: '32px',
        borderRadius: '10px', // Match close button
        flexShrink: 0,
    },
    emptyState: {
        textAlign: 'center',
        color: 'var(--text-muted)',
        marginTop: '60px',
        fontStyle: 'italic',
        fontSize: '0.9rem',
    }
};

export default StatsCardListModal;
