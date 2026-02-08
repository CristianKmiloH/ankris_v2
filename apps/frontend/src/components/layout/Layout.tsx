import React, { type ReactNode } from 'react';
import BottomNav from './BottomNav';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
    activeTab?: 'home' | 'library' | 'study' | 'stats';
    title?: ReactNode;
    subtitle?: string;
    showBackButton?: boolean;
    headerAction?: ReactNode;
    className?: string; // For explicit fade-in or other classes
    disableScroll?: boolean; // New prop to disable Layout's internal scroll
}

const Layout: React.FC<LayoutProps> = ({
    children,
    activeTab,
    title,
    subtitle,
    showBackButton = false,
    headerAction,
    className = "fade-in",
    disableScroll = false
}) => {
    const navigate = useNavigate();

    return (

        <div style={styles.container}>
            {/* Content Wrapper for Fade In */}
            <div className={className} style={styles.fadeWrapper}>
                {/* Header Section */}
                {(title || showBackButton || headerAction) && (
                    <div style={styles.header}>
                        {showBackButton && (
                            <button
                                onClick={() => navigate(-1)}
                                style={styles.backButton}
                                className="btn-icon-round"
                            >
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}

                        <div style={{ flex: 1 }}>
                            {title && <h1 style={styles.title}>{title}</h1>}
                            {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
                        </div>

                        {headerAction && (
                            <div style={styles.actions}>
                                {headerAction}
                            </div>
                        )}
                    </div>
                )}

                {/* Main Content */}
                <main style={{
                    ...styles.content,
                    overflowY: disableScroll ? 'hidden' : 'auto', // Conditionally disable scroll
                    display: disableScroll ? 'flex' : 'block',    // Ensure flex behavior for children
                    flexDirection: 'column',
                    padding: disableScroll ? 0 : styles.content.padding, // Allow full width/height
                }}>
                    {children}
                </main>
            </div>

            {/* Navigation */}
            {activeTab && <BottomNav activeTab={activeTab} />}
        </div>
    );
};

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column' as const,
        backgroundColor: 'var(--bg-app)',
        color: 'var(--text-primary)',
        width: '100%',
        maxWidth: 'none',
        margin: '0',
        position: 'relative' as const,
        overflow: 'hidden',
    },
    header: {
        padding: '24px 24px 0 24px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        flexShrink: 0,
    },
    backButton: {
        marginRight: '16px',
    },
    title: {
        fontSize: 'clamp(2rem, 5vw, 2.5rem)',
        lineHeight: '1.1',
        marginBottom: '8px',
        color: 'var(--text-primary)',
        letterSpacing: '-1px',
    },
    subtitle: {
        color: 'var(--accent-cyan)',
        fontSize: '0.875rem',
        fontWeight: '600',
        letterSpacing: '1px',
        textTransform: 'uppercase' as const,
    },
    actions: {
        display: 'flex',
        gap: '12px',
    },
    content: {
        flex: '1 1 auto',
        width: '100%',
        minHeight: 0,
        padding: '0 24px 100px 24px', // Increased to 100px to ensure scroll clearance behind BottomNav
        scrollbarWidth: 'thin' as const,
    },
    fadeWrapper: {
        display: 'flex',
        flexDirection: 'column' as const,
        flex: 1,
        minHeight: 0,
        overflow: 'hidden', // Contain scrolling within this wrapper
        width: '100%',
    }
};

export default Layout;
