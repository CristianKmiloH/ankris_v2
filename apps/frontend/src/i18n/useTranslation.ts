import { useSettings } from '../context/SettingsContext';
import { translations, type TranslationKey } from './translations';

export const useTranslation = () => {
    const { settings } = useSettings();

    const t = (key: TranslationKey): string => {
        return translations[settings.language][key] || key;
    };

    return { t, language: settings.language };
};
