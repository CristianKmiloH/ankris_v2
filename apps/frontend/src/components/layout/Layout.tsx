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
    headerStyle?: React.CSSProperties; // New prop for custom header styles
}

const Layout: React.FC<LayoutProps> = ({
    children,
    activeTab,
    title,
    subtitle,
    showBackButton = false,
    headerAction,
    className = "fade-in",
    disableScroll = false,
    headerStyle = {}
}) => {
    const navigate = useNavigate();

    return (

        <div style={styles.container}>
            {/* Content Wrapper for Fade In */}
            <div className={className} style={styles.fadeWrapper}>
                {/* Header Section */}
                {(title || showBackButton || headerAction) && (
                    <div style={{
                        ...styles.header,
                        ...((!title && !showBackButton && headerAction) ? styles.compactHeader : {}),
                        ...headerStyle
                    }}>
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

                        <div style={{ flex: 1, minWidth: 0 }}>
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
        padding: '12px 12px 0 12px', // Minimal padding
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px', // Minimal gap
        flexShrink: 0,
    },
    compactHeader: {
        padding: '8px 12px 0 12px',
        marginBottom: '4px',
        minHeight: '40px',
    },
    backButton: {
        marginRight: '12px', // Reduced margin
        marginTop: '8px',
    },
    title: {
        fontSize: 'clamp(2.4rem, 7vw, 4rem)', // Slightly adjusted min to fit
        lineHeight: '1.1',
        marginBottom: '4px',
        color: 'var(--text-primary)',
        letterSpacing: '-1px',
        fontWeight: '800',
        whiteSpace: 'nowrap' as const, // Force single line
    },
    subtitle: {
        color: 'var(--accent-cyan)',
        fontSize: '0.8rem', // Slightly smaller for better fit
        fontWeight: '600',
        letterSpacing: '0.5px',
        textTransform: 'uppercase' as const,
        whiteSpace: 'normal', // Allow wrapping
        lineHeight: '1.2',
        marginTop: '2px',
        display: 'block',
    },
    actions: {
        display: 'flex',
        gap: '12px',
        flexShrink: 0, // Prevent shrinking
        alignItems: 'center',
        marginTop: '8px', // Visual alignment
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
