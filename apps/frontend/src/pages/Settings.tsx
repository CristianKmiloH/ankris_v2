import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

const Settings: React.FC = () => {
    const { settings, updateSettings } = useSettings();

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.title}>⚙️ Settings</h1>

                {/* Language Selection */}
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Language / Idioma</h2>
                    <div style={styles.optionGroup}>
                        <button
                            onClick={() => updateSettings({ language: 'en' })}
                            className={`btn-select-option ${settings.language === 'en' ? 'active' : ''}`}
                        >
                            <span style={styles.optionIcon}>🇺🇸</span>
                            <span style={styles.optionText}>English</span>
                            {settings.language === 'en' && <span style={styles.checkmark}>✓</span>}
                        </button>
                        <button
                            onClick={() => updateSettings({ language: 'es' })}
                            className={`btn-select-option ${settings.language === 'es' ? 'active' : ''}`}
                        >
                            <span style={styles.optionIcon}>🇪🇸</span>
                            <span style={styles.optionText}>Español</span>
                            {settings.language === 'es' && <span style={styles.checkmark}>✓</span>}
                        </button>
                    </div>
                    <p style={styles.hint}>
                        {settings.language === 'en'
                            ? 'AI-generated cards will be in this language'
                            : 'Las tarjetas generadas por IA estarán en este idioma'}
                    </p>
                </div>

                {/* Theme Selection */}
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>
                        {settings.language === 'en' ? 'Theme' : 'Tema'}
                    </h2>
                    <div style={styles.optionGroup}>
                        <button
                            onClick={() => updateSettings({ theme: 'dark' })}
                            className={`btn-select-option ${settings.theme === 'dark' ? 'active' : ''}`}
                        >
                            <span style={styles.optionIcon}>🌙</span>
                            <span style={styles.optionText}>
                                {settings.language === 'en' ? 'Dark' : 'Oscuro'}
                            </span>
                            {settings.theme === 'dark' && <span style={styles.checkmark}>✓</span>}
                        </button>
                        <button
                            onClick={() => updateSettings({ theme: 'light' })}
                            className={`btn-select-option ${settings.theme === 'light' ? 'active' : ''}`}
                        >
                            <span style={styles.optionIcon}>☀️</span>
                            <span style={styles.optionText}>
                                {settings.language === 'en' ? 'Light' : 'Claro'}
                            </span>
                            {settings.theme === 'light' && <span style={styles.checkmark}>✓</span>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <nav className="bottom-nav">
                <Link to="/" className="nav-item">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>Home</span>
                </Link>
                <Link to="/browser" className="nav-item">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>Library</span>
                </Link>
                <Link to="/study" className="nav-item">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>Study</span>
                </Link>
                <Link to="/stats" className="nav-item">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Stats</span>
                </Link>
                <span className="nav-item active">
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Settings</span>
                </span>
            </nav>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1a1a2e 100%)',
        paddingBottom: '80px',
    },
    content: {
        padding: '40px 20px',
        maxWidth: '600px',
        margin: '0 auto',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '40px',
        background: 'linear-gradient(to right, #00D9FF, #7B2FF7)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        textAlign: 'center',
    },
    section: {
        marginBottom: '40px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: '600',
        marginBottom: '20px',
        color: '#00D9FF',
    },
    optionGroup: {
        display: 'flex',
        gap: '12px',
        marginBottom: '12px',
    },
    optionButton: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        position: 'relative',
    },
    optionButtonActive: {},
    optionIcon: {
        fontSize: '1.5rem',
    },
    optionText: {
        fontWeight: '600',
    },
    checkmark: {
        position: 'absolute',
        right: '12px',
        fontSize: '1.2rem',
        color: '#FFFFFF',
    },
    hint: {
        fontSize: '0.875rem',
        color: 'rgba(255, 255, 255, 0.6)',
        fontStyle: 'italic',
        marginTop: '8px',
    },
};

export default Settings;
