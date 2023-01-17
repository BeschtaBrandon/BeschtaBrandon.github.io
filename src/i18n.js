import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import englishTranslations from './lang/en/js-common.json';
import frenchTranslations from './lang/fr/js-common.json';

const resources = {
  en: {
    translation: englishTranslations
  },
  fr: {
    translation: frenchTranslations
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: '.',

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
