import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enHome from './locales/en/Home.json';
import hiHome from './locales/hi/Home.json';
import mrHome from './locales/mr/Home.json';
import enMarketplaceCard from './locales/en/marketplacecard.json';
import hiMarketplaceCard from './locales/hi/marketplacecard.json';
import mrMarketplaceCard from './locales/mr/marketplacecard.json';
import enMarketplace from './locales/en/marketplace.json';
import hiMarketplace from './locales/hi/marketplace.json';
import mrMarketplace from './locales/mr/marketplace.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
        en: {
            home: enHome,
            marketplacecard: enMarketplaceCard,
            marketplace: enMarketplace,
          },
        hi: {
            home: hiHome,
            marketplacecard: hiMarketplaceCard,
            marketplace: hiMarketplace,
        },
        mr: {
            home: mrHome,
            marketplacecard: mrMarketplaceCard,
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