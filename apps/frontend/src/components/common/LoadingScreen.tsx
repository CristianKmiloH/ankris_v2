import React from 'react';
import { useTranslation } from '../../i18n/useTranslation';

const LoadingScreen: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div style={styles.container} className="fade-in">
            <span className="loading-spin" style={{ fontSize: '3rem' }}>⏳</span>
            <p style={styles.text}>{t('loading')}</p>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        backgroundColor: 'var(--bg-app)',
        color: 'var(--text-primary)',
    },
    text: {
        fontSize: '1.25rem',
        color: 'var(--text-secondary)',
    }
};

export default LoadingScreen;
