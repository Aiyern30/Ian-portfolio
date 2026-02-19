// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend'; // To load translations from the backend
import LanguageDetector from 'i18next-browser-languagedetector'; // To auto-detect language

i18n
  .use(Backend) // load translations from the backend
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // connect with React
  .init({
    fallbackLng: 'en', // Default language if the detected one is not available
    debug: true, // Optional: Enables debug logs in development
    interpolation: {
      escapeValue: false, // React already escapes variables
    },
    backend: {
      // Backend configuration to load translation files
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to translation files
    },
  });

export default i18n;
