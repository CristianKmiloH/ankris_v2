import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../i18n/useTranslation';
import SettingsModal from '../settings/SettingsModal';

interface BottomNavProps {
    activeTab: 'home' | 'library' | 'study' | 'stats';
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab }) => {
    const { t } = useTranslation();
    const [openSettings, setOpenSettings] = useState(false);
    const [triggerAnim, setTriggerAnim] = useState(false);

    // Force animation restart whenever activeTab changes
    useEffect(() => {
        setTriggerAnim(false);
        const timer = setTimeout(() => {
            setTriggerAnim(true);
        }, 50); // Small delay to ensure browser register the "off" state
        return () => clearTimeout(timer);
    }, [activeTab]);

    // Helper to determine class name
    // We append 'play-anim' only when triggerAnim is true to force execution
    const getNavItemClass = (tabName: string) =>
        `nav-item ${activeTab === tabName && triggerAnim ? 'active' : ''}`;

    return (
        <>
            <nav className="bottom-nav">
                <Link
                    to="/"
                    className={`${getNavItemClass('home')} anim-home`}
                    key={`home-${activeTab === 'home' ? 'active' : 'inactive'}`} // Force remount to replay anim
                >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {/* House Frame */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" />
                        {/* Interior Light (Behind Door) */}
                        <path className="house-interior" stroke="none" fill="currentColor" d="M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4H9z" opacity="0" />
                        {/* Door (Independent) */}
                        <path className="house-door" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4" />
                    </svg>
                    <span>{t('home')}</span>
                </Link>
                <Link
                    to="/browser"
                    className={`${getNavItemClass('library')} anim-library`}
                    key={`library-${activeTab === 'library' ? 'active' : 'inactive'}`}
                >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {/* Left Page & Spine (Static) */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13 M12 6.253C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
                        {/* Right Page (Static Underneath) */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        {/* Right Page (Animated Top) */}
                        <path className="page-right" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>{t('library')}</span>
                </Link>
                <Link
                    to="/study"
                    className={`${getNavItemClass('study')} anim-study`}
                    key={`study-${activeTab === 'study' ? 'active' : 'inactive'}`}
                >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {/* Card 3 (Back) */}
                        <path
                            fill="var(--bg-card)"
                            strokeOpacity="0.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2z"
                        />
                        {/* Card 2 (Middle) */}
                        <path
                            fill="var(--bg-card)"
                            strokeOpacity="0.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2z"
                        />
                        {/* Card 1 (Front - Animated) */}
                        <path
                            className="card-front-icon"
                            fill="var(--bg-card)"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2z"
                        />
                    </svg>
                    <span>{t('study')}</span>
                </Link>
                <Link
                    to="/stats"
                    className={`${getNavItemClass('stats')} anim-stats`}
                    key={`stats-${activeTab === 'stats' ? 'active' : 'inactive'}`}
                >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {/* Small Bar (Left) */}
                        <path className="bar-small" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z" />
                        {/* Medium Bar (Middle) */}
                        <path className="bar-medium" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z" />
                        {/* Large Bar (Right) */}
                        <path className="bar-large" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 19V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                    </svg>
                    <span>DATOS</span>
                </Link>
                <div
                    onClick={() => {
                        setTriggerAnim(true); // Re-use this for simplicity or add specific state
                        setOpenSettings(true);
                    }}
                    role="button"
                    className="nav-item settings-button"
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%',
                        padding: '0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2px',
                        color: 'white',
                        fontSize: '0.7rem',
                        WebkitTapHighlightColor: 'transparent', // REMOVED THE BLUE BOX
                        outline: 'none'
                    }}
                    title={t('settings')}
                >
                    <svg
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        style={{
                            width: '24px',
                            height: '24px',
                            transition: 'transform 0.5s ease',
                            transform: openSettings ? 'rotate(90deg)' : 'rotate(0deg)' // Rotate when open
                        }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {/* Ghost element for vertical alignment */}
                    <span style={{ visibility: 'hidden' }}>DATOS</span>
                </div>
            </nav>

            {openSettings && <SettingsModal onClose={() => setOpenSettings(false)} />}
        </>
    );
};

export default BottomNav;
