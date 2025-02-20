import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import RNLanguageDetector from "@os-team/i18next-react-native-language-detector";

import enTranslation from "./en.json";
import arTranslation from "./ar.json";
import frTranslation from "./fr.json";
import { I18nManager } from "react-native";

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    lng: I18nManager.isRTL ? 'ar' : 'en', // Set language based on RTL
    supportedLngs: ["en", "fr", "ar"],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    resources: {
      en: {
        translation: enTranslation,
      },
      fr: {
        translation: frTranslation,
      },
      ar: {
        translation: arTranslation,
      },
    },
  });
