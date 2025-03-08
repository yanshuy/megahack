import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enHome from './locales/en/Home.json';
import hiHome from './locales/hi/Home.json';
import mrHome from './locales/mr/Home.json';
import enMarketplace from './locales/en/marketplace.json';
import hiMarketplace from './locales/hi/marketplace.json';
import mrMarketplace from './locales/mr/marketplace.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
        en: {
            home: enHome,
            marketplace: enMarketplace,
          },
        hi: {
            home: hiHome,
            marketplace: hiMarketplace,
        },
        mr: {
            home: mrHome,
            marketplace: mrMarketplace,
        },
    },
    lng: localStorage.getItem('lang') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;