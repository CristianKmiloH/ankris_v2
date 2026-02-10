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
        padding: '16px 16px 0 16px', // Reduced padding for mobile
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'flex-start', // Align with title, not center of block
        gap: '16px',
        flexShrink: 0,
    },
    compactHeader: {
        padding: '8px 16px 0 16px',
        marginBottom: '4px',
        minHeight: '40px',
    },
    backButton: {
        marginRight: '16px',
        marginTop: '8px', // Align with new title position
    },
    title: {
        fontSize: 'clamp(2.5rem, 6vw, 3rem)', // Increased size further as requested
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
        whiteSpace: 'nowrap' as const,
        overflow: 'hidden' as const,
        textOverflow: 'ellipsis' as const,
        maxWidth: '100%',
        display: 'block',
    },
    actions: {
        display: 'flex',
        gap: '12px',
        flexShrink: 0, // Prevent shrinking
        alignItems: 'center',
        marginTop: '6px', // Visual alignment with large title
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
