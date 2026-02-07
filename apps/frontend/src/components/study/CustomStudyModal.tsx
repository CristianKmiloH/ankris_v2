import React from 'react';
import { useTranslation } from '../../i18n/useTranslation';
import { useNavigate } from 'react-router-dom';

interface CustomStudyModalProps {
    deckId: string;
    deckName: string;
    onClose: () => void;
}

const CustomStudyModal: React.FC<CustomStudyModalProps> = ({ deckId, deckName, onClose }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleStart = (type: string) => {
        if (type === 'standard') {
            navigate(`/decks/${deckId}/study`);
        } else {
            navigate(`/decks/${deckId}/study?type=${type}`);
        }
        onClose();
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
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
                </div>

                <button style={styles.cancelButton} onClick={onClose}>
                    {t('cancel')}
                </button>
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
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        animation: 'scaleIn 0.2s ease-out',
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
    }
};

export default CustomStudyModal;
