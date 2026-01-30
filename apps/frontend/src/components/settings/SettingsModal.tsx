import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { useTranslation } from '../../i18n/useTranslation';
import { useAuth } from '../../context/AuthContext';

interface SettingsModalProps {
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
    const { settings, updateSettings } = useSettings();
    const { t } = useTranslation();
    const { logout } = useAuth();

    return (
        <div style={styles.overlay} onClick={onClose} className="fade-in">
            <div style={styles.modal} onClick={e => e.stopPropagation()} className="slide-up">

                {/* Header */}
                <div style={styles.header}>
                    <h2 style={styles.title}>{t('settings')}</h2>
                    <button onClick={onClose} className="btn-close-premium">
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div style={styles.content}>
                    {/* Language Section */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>{t('language')}</h3>
                        <div style={styles.grid}>
                            <button
                                className={`btn-select-option ${settings.language === 'en' ? 'active' : ''}`}
                                onClick={() => updateSettings({ language: 'en' })}
                            >
                                <span style={styles.icon}>🇺🇸</span> English
                            </button>
                            <button
                                className={`btn-select-option ${settings.language === 'es' ? 'active' : ''}`}
                                onClick={() => updateSettings({ language: 'es' })}
                            >
                                <span style={styles.icon}>🇪🇸</span> Español
                            </button>
                        </div>
                    </div>

                    {/* Theme Section */}
                    <div style={styles.section}>
                        <h3 style={styles.sectionTitle}>{t('theme')}</h3>
                        <div style={styles.grid}>
                            <button
                                className={`btn-select-option ${settings.theme === 'dark' ? 'active' : ''}`}
                                onClick={() => updateSettings({ theme: 'dark' })}
                            >
                                <span style={styles.icon}>🌙</span> {t('dark')}
                            </button>
                            <button
                                className={`btn-select-option ${settings.theme === 'light' ? 'active' : ''}`}
                                onClick={() => updateSettings({ theme: 'light' })}
                            >
                                <span style={styles.icon}>☀️</span> {t('light')}
                            </button>
                        </div>
                    </div>

                    {/* Info */}
                    <div style={styles.divider}></div>
                    <p style={styles.infoText}>
                        {t('aiCardsLanguage')}
                    </p>

                    {/* Logout */}
                    <button onClick={logout} className="btn-danger" style={styles.logoutButton}>
                        {t('logout')}
                    </button>
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
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    modal: {
        backgroundColor: 'var(--bg-card)',
        width: '100%',
        maxWidth: 'min(90%, 450px)',
        maxHeight: '85vh', // Slightly reduced to ensure it fits with nav bars
        borderRadius: '24px',
        border: '1px solid var(--bg-card-elevated)',
        boxShadow: 'var(--shadow-card)',
        color: 'var(--text-primary)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative', // Ensure containment
    },
    header: {
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--bg-card-elevated)',
        flexShrink: 0, // Header shouldn't shrink
    },
    title: {
        margin: 0,
        fontSize: '1.25rem',
        fontWeight: '700',
        color: 'var(--text-primary)',
    },
    closeButton: {
        background: 'transparent',
        border: 'none',
        color: 'var(--text-secondary)',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background 0.2s, color 0.2s',
    },
    content: {
        padding: '24px',
        overflowY: 'auto', // Scroll content only
        flex: 1, // Take remaining space
        minHeight: 0, // Allow flex shrinking
    },
    section: {
        marginBottom: '24px',
    },
    sectionTitle: {
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        marginBottom: '12px',
        textTransform: 'uppercase',
        fontWeight: '700',
        letterSpacing: '0.05em',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
    },
    optionButton: {
        padding: '12px',
        backgroundColor: 'var(--bg-app)',
        border: '2px solid transparent',
        borderRadius: '16px',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        fontSize: '0.95rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.2s',
    },
    optionActive: {
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--accent-cyan)',
        color: 'var(--text-primary)',
        boxShadow: '0 2px 8px rgba(0, 217, 255, 0.15)',
    },
    icon: {
        fontSize: '1.1rem',
    },
    divider: {
        height: '1px',
        backgroundColor: 'var(--bg-card-elevated)',
        margin: '8px 0 20px 0',
    },
    infoText: {
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        textAlign: 'center',
        marginBottom: '20px',
    },
    logoutButton: {
        width: '100%',
        padding: '14px',
        fontWeight: '900',
        fontSize: '0.95rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
    },
};

export default SettingsModal;
