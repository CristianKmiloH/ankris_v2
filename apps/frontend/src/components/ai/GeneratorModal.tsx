import React, { useState } from 'react';
import { generateCards } from '../../services/aiService';
import { createNote } from '../../services/noteService';
import { useSettings } from '../../context/SettingsContext';
import { useTranslation } from '../../i18n/useTranslation';

interface GeneratorModalProps {
    deckId: string;
    onClose: () => void;
    onSuccess: () => void;
}

const GeneratorModal: React.FC<GeneratorModalProps> = ({ deckId, onClose, onSuccess }) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatedCards, setGeneratedCards] = useState<Array<{ front: string, back: string }> | null>(null);
    const { settings } = useSettings();
    const { t } = useTranslation();

    const handleGenerate = async () => {
        if (!text) return;
        setLoading(true);
        try {
            const data = await generateCards(text, settings.language);
            setGeneratedCards(data);
        } catch (err) {
            alert('Failed to generate. Check console.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!generatedCards) return;
        setLoading(true);
        try {
            for (const card of generatedCards) {
                await createNote(deckId, card.front, card.back);
            }
            // Use a toast or less intrusive notification in a real app
            onSuccess();
            onClose();
        } catch (err) {
            alert('Failed to save cards.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay} className="fade-in">
            <div style={styles.modal} className="slide-up">

                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerTitle}>
                        <span style={{ fontSize: '1.5rem' }}>✨</span>
                        <h2 style={styles.title}>{t('aiFlashcardGenerator')}</h2>
                    </div>
                    <button onClick={onClose} className="btn-icon-round">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {!generatedCards ? (
                        <>
                            <p style={styles.instruction}>{t('enterTopicOrText')}</p>
                            <textarea
                                style={styles.textarea}
                                placeholder="E.g. 'Photosynthesis', 'German Verbs', or paste an article..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />

                            <div style={styles.footer}>
                                <button onClick={onClose} className="btn-secondary" style={{ minWidth: '120px' }}>
                                    {t('cancel')}
                                </button>
                                <button
                                    onClick={handleGenerate}
                                    disabled={loading || !text}
                                    className="btn-primary"
                                    style={{
                                        opacity: (loading || !text) ? 0.5 : 1,
                                        cursor: (loading || !text) ? 'not-allowed' : 'pointer',
                                        minWidth: '160px'
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading-spinner-small"></span>
                                            {t('generating')}
                                        </>
                                    ) : (
                                        <>
                                            <svg className="anim-shake-glow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2.5" style={{ marginRight: 0 }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            {t('generate')}
                                        </>
                                    )}
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div style={styles.resultsHeader}>
                                <span style={styles.resultsCount}>
                                    {generatedCards.length} {t('generatedCards')}
                                </span>
                            </div>

                            <div style={styles.cardsGrid}>
                                {generatedCards.map((card, i) => (
                                    <div key={i} style={styles.cardPreview}>
                                        <div style={styles.cardFace}>
                                            <span style={styles.cardLabel}>Q</span>
                                            <p style={styles.cardText}>{card.front}</p>
                                        </div>
                                        <div style={styles.divider}></div>
                                        <div style={styles.cardFace}>
                                            <span style={{ ...styles.cardLabel, color: 'var(--accent-cyan)' }}>A</span>
                                            <p style={{ ...styles.cardText, color: 'var(--text-secondary)' }}>{card.back}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={styles.footer}>
                                <button
                                    onClick={() => setGeneratedCards(null)}
                                    className="btn-secondary"
                                    style={{ minWidth: '120px' }}
                                >
                                    <svg className="anim-rotate-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M23 4v6h-6M1 20v-6h6" />
                                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                                    </svg>
                                    {t('again')}
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="btn-primary"
                                    style={{
                                        minWidth: '160px',
                                        maxWidth: '300px'
                                    }}
                                >
                                    {loading ? (
                                        t('loading')
                                    ) : (
                                        <>
                                            <svg className="icon-glow-green" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" style={{ marginRight: 0 }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {t('saveAllToDeck')}
                                        </>
                                    )}
                                </button>
                            </div>
                        </>
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000, // Higher than nav
        display: 'flex',
        alignItems: 'center', // Center vertically
        justifyContent: 'center',
        padding: '20px 20px 100px 20px', // Bottom padding avoids Nav overlap
    },
    modal: {
        backgroundColor: '#121212',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '800px',
        height: '100%', // Fills the padded overlay space
        marginTop: '0',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
    },
    header: {
        padding: '20px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
    },
    headerTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    title: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: 'white',
        margin: 0,
    },
    content: {
        padding: '24px',
        overflowY: 'hidden', // Stop container scroll
        display: 'flex',
        flexDirection: 'column',
        flex: 1, // Fill remaining space
        minHeight: 0,
    },
    instruction: {
        color: 'var(--text-secondary)',
        marginBottom: '12px',
        fontSize: '1rem',
    },
    textarea: {
        width: '100%',
        height: '200px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '16px',
        color: 'white',
        fontSize: '1rem',
        resize: 'none',
        marginBottom: '24px',
        outline: 'none',
    },
    footer: {
        display: 'flex',
        justifyContent: 'center', // Center alignment like AddNote
        gap: '16px', // Matching AddNote gap
        marginTop: 'auto', // Push to bottom
        paddingTop: '20px',
        flexShrink: 0,
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    },
    // Buttons
    cancelButton: {
        padding: '12px 24px',
        borderRadius: '12px',
        border: 'none',
        background: 'none',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '500',
    },
    generateButton: {
        padding: '12px 32px',
        borderRadius: '12px',
        border: 'none',
        background: 'var(--gradient-primary)',
        color: 'white',
        cursor: 'pointer',
        fontSize: '1rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    retryButton: {
        padding: '12px 24px',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        background: 'rgba(255, 255, 255, 0.05)',
        color: 'white',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
    },
    saveButton: {
        padding: '12px 32px',
        borderRadius: '12px',
        border: 'none',
        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', // Green gradient
        color: 'white',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '600',
        flex: 1,
        maxWidth: '300px',
    },
    // Results
    resultsHeader: {
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
    },
    resultsCount: {
        color: 'var(--text-secondary)',
        fontSize: '0.9rem',
        fontWeight: '500',
    },
    cardsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '12px',
        marginBottom: '0', // Handled by flex gap
        overflowY: 'auto', // Scroll ONLY the cards
        flex: 1,
        minHeight: 0,
        paddingRight: '6px',
    },
    cardPreview: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    cardFace: {
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
    },
    cardLabel: {
        fontSize: '0.75rem',
        fontWeight: 'bold',
        color: 'var(--accent-purple)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: '2px 6px',
        borderRadius: '4px',
        marginTop: '2px',
        flexShrink: 0,
    },
    cardText: {
        fontSize: '0.95rem',
        color: '#fff',
        margin: 0,
        lineHeight: '1.4',
    },
    divider: {
        height: '1px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        width: '100%',
    }
};

export default GeneratorModal;
