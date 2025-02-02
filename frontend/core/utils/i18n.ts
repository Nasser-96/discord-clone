"use client";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "../../public/locales/en/common.json";
import arTranslation from "../../public/locales/ar/common.json";

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    ar: { translation: arTranslation },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18next;
