import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enHome from "./locales/en/Home.json";
import hiHome from "./locales/hi/Home.json";
import mrHome from "./locales/mr/Home.json";
import enMarketplaceCard from "./locales/en/MarketPlaceCard.json";
import hiMarketplaceCard from "./locales/hi/MarketPlaceCard.json";
import mrMarketplaceCard from "./locales/mr/MarketPlaceCard.json";
import enMarketplace from "./locales/en/MarketPlace.json";
import hiMarketplace from "./locales/hi/MarketPlace.json";
import mrMarketplace from "./locales/mr/MarketPlace.json";

i18n.use(initReactI18next).init({
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
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
