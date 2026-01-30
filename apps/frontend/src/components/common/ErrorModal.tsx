import React from 'react';

interface ErrorModalProps {
    isOpen: boolean;
    title?: string;
    message: string;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, title = 'Error', message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay} className="fade-in">
            <div style={styles.modal} className="slide-up">

                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerTitle}>
                        <div style={styles.iconContainer}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 style={styles.title}>{title}</h2>
                    </div>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    <p style={styles.message}>
                        {message.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </p>
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <button onClick={onClose} style={styles.button}>
                        Entendido
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999, // Extremely high z-index to overlay everything
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    },
    modal: {
        backgroundColor: '#1E1E1E',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid rgba(255, 100, 100, 0.2)', // Red tint border
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        padding: '24px 24px 16px', // Top/Right/Bottom
        display: 'flex',
        alignItems: 'center',
    },
    headerTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    iconContainer: {
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        backgroundColor: 'rgba(239, 68, 68, 0.1)', // Red background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#EF4444', // Red icon
    },
    title: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        color: '#EF4444', // Red text
        margin: 0,
    },
    content: {
        padding: '0 24px 24px',
    },
    message: {
        color: '#EAEAEA',
        fontSize: '1rem',
        lineHeight: '1.6',
        margin: 0,
        whiteSpace: 'pre-line', // Preserve newlines
    },
    footer: {
        padding: '16px 24px 24px',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        width: '100%',
        padding: '14px',
        borderRadius: '16px',
        border: 'none',
        background: '#EF4444', // Red button
        color: 'white',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)',
    }
};

export default ErrorModal;
