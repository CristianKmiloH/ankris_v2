import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createNote } from '../../services/noteService';
import { useTranslation } from '../../i18n/useTranslation';
import Layout from '../layout/Layout';

const AddNote: React.FC = () => {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    const { t } = useTranslation();

    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (deckId) {
                // Convert newlines to breaks for HTML compatibility
                const processedFront = front.replace(/\n/g, '<br>');
                const processedBack = back.replace(/\n/g, '<br>');

                await createNote(deckId, processedFront, processedBack);

                setShowSuccess(true);

                // Navigate back after delay
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            }
        } catch (err) {
            console.error(err);
            // Optional: Add error state/toast here
        }
    };

    return (
        <Layout activeTab="library" className="fade-in" disableScroll={true}>
            <div style={styles.container}>
                {/* Fixed Header */}
                <div style={styles.header}>
                    <button
                        onClick={() => navigate(-1)}
                        style={styles.backButton}
                        title={t('back') || 'Go Back'}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <div>
                        <h1 style={styles.pageTitle}>{t('addNote')}</h1>
                        <p style={styles.subtitle}>{t('createFlashcards') || 'CREATE NEW FLASHCARDS'}</p>
                    </div>
                </div>

                {/* Scrollable Content Area */}
                <div style={styles.scrollContainer}>
                    <div style={styles.cardWrapper}>
                        <form onSubmit={handleSubmit} style={styles.formCard}>
                            {/* Front Field */}
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>{t('front')}</label>
                                <textarea
                                    style={styles.textArea}
                                    value={front}
                                    onChange={e => setFront(e.target.value)}
                                    placeholder="Type the question here..."
                                />
                            </div>

                            {/* Back Field */}
                            <div style={styles.fieldGroup}>
                                <label style={styles.label}>{t('back')}</label>
                                <textarea
                                    style={styles.textArea}
                                    value={back}
                                    onChange={e => setBack(e.target.value)}
                                    placeholder="Type the answer here..."
                                />
                            </div>
                        </form>
                    </div>
                </div>

                {/* Fixed Footer Actions */}
                <div style={styles.actionsFooter}>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="btn-secondary"
                        style={styles.cancelButton}
                    >
                        {t('cancel')}
                    </button>
                    <button
                        onClick={handleSubmit}
                        style={styles.saveButton}
                        className="btn-primary"
                    >
                        {t('save')}
                    </button>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccess && (
                <div style={styles.successOverlay}>
                    <div style={styles.successContent}>
                        <div style={styles.checkCircle}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h3 style={styles.successText}>{t('saved') || 'Guardado'}</h3>
                    </div>
                </div>
            )}
        </Layout>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh', // Dynamic viewport height for modern browsers
        overflow: 'hidden', // Prevent outer scroll
        position: 'relative',
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '20px 24px',
        flexShrink: 0,
        zIndex: 10,
    },
    backButton: {
        width: '48px',
        height: '48px',
        minWidth: '48px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'var(--text-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
        backdropFilter: 'blur(5px)',
        padding: 0,
    },
    pageTitle: {
        fontSize: '2rem',
        fontWeight: '900',
        color: 'var(--text-primary)',
        margin: 0,
        lineHeight: '1.1',
        letterSpacing: '-0.02em',
        textShadow: '0 0 20px rgba(0, 217, 255, 0.2)',
    },
    subtitle: {
        color: 'var(--accent-cyan)',
        fontSize: '0.85rem',
        fontWeight: '700',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginTop: '6px',
    },
    scrollContainer: {
        flex: 1, // Takes updated space between header and footer
        overflow: 'hidden', // Disable layout scroll
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '10px 24px',
    },
    cardWrapper: {
        flex: 1, // Fill available vertical space
        width: '100%',
        maxWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        minHeight: 0,
    },
    formCard: {
        flex: 1, // Fill wrapper
        width: '100%',
        backgroundColor: 'var(--bg-card)',
        padding: '24px',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflow: 'hidden', // Key change: No scroll on card itself
    },
    fieldGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        flex: 1, // Split space equally
        minHeight: 0, // Allow shrinking
        overflow: 'hidden', // Contain text area
    },
    label: {
        color: 'var(--text-secondary)',
        fontSize: '0.95rem',
        fontWeight: '600',
        marginLeft: '4px',
        flexShrink: 0, // Keep label visible
    },
    textArea: {
        width: '100%',
        flex: 1, // Fill remaining height of fieldGroup
        backgroundColor: 'var(--bg-input)',
        border: '1px solid transparent',
        borderRadius: '16px',
        padding: '16px',
        color: 'var(--text-primary)',
        fontSize: '1rem',
        lineHeight: '1.5',
        resize: 'none',
        outline: 'none',
        transition: 'all 0.2s',
        boxSizing: 'border-box',
        overflowY: 'auto', // Scroll internal to text area
    },
    actionsFooter: {
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        padding: '16px 24px',
        paddingBottom: 'calc(16px + 72px)', // Clearance for 60px nav + 12px breathing room
        flexShrink: 0,
        width: '100%',
        background: 'linear-gradient(to top, var(--bg-app) 90%, transparent)',
        zIndex: 20,
    },
    cancelButton: {
        minWidth: '120px',
    },
    saveButton: {
        cursor: 'pointer',
        minWidth: '160px',
    },
    successOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(5px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.2s ease-out',
    },
    successContent: {
        backgroundColor: 'rgba(23, 23, 28, 0.95)',
        borderRadius: '24px',
        padding: '32px 48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        transform: 'scale(0.9)',
        animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
    },
    checkCircle: {
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'var(--accent-green, #10b981)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)',
    },
    successText: {
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: '700',
        margin: 0,
    }
};

export default AddNote;
