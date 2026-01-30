import React, { createContext, useContext, useState, useEffect } from 'react';

interface Settings {
    language: 'en' | 'es';
    theme: 'dark' | 'light';
}

interface SettingsContextType {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<Settings>(() => {
        const saved = localStorage.getItem('settings');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return { language: 'en', theme: 'dark' };
            }
        }
        return { language: 'en', theme: 'dark' };
    });

    useEffect(() => {
        // Apply theme to root element
        document.documentElement.className = settings.theme === 'light' ? 'light-theme' : '';
    }, [settings.theme]);

    const updateSettings = (newSettings: Partial<Settings>) => {
        console.log('Updating settings:', newSettings); // Debug
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        localStorage.setItem('settings', JSON.stringify(updated));
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within SettingsProvider');
    }
    return context;
};
