import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ar from './locales/ar.json';
import en from './locales/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      en: { translation: en },
    },
    fallbackLng: 'ar',
    supportedLngs: ['ar', 'en'],
    interpolation: { escapeValue: false },
    detection: {
      // Brand default: Arabic. Only honour the user's prior choice; do
      // not auto-switch to English based on browser language.
      order: ['localStorage'],
      caches: ['localStorage'],
      lookupLocalStorage: 'tasheeh-lang',
    },
  });

export const isRTL = (lang) => lang === 'ar';

export default i18n;
