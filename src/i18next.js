import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "./catalog-en.json";
import armenian from "./catalog-am.json";

const resources = {
  en: {
    translation: english,
  },
  am: {
    translation: armenian,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "am",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
