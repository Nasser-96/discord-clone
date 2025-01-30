import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // Default language
    supportedLngs: ["en", "ar"], // Supported languages
    ns: ["common"], // List of namespaces
    defaultNS: "common", // Default namespace
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Path to load translations
    },
    interpolation: {
      escapeValue: false, // React already escapes content
    },
  });

export default i18n;
