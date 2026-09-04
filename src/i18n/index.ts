import { useSyncExternalStore } from "react";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ptBR from "./pt-BR.json";

export const locales = ["en", "pt-BR"] as const;
export type Locale = (typeof locales)[number];

export const defaultNS = "translation";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      "pt-BR": { translation: ptBR },
    },
    fallbackLng: {
      "pt-PT": ["pt-BR", "en"],
      pt: ["pt-BR", "en"],
      default: ["en"],
    },
    supportedLngs: locales,
    load: "currentOnly",
    defaultNS,
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "locale",
      caches: ["localStorage"],
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

const syncHtmlLang = (lng: string) => {
  document.documentElement.lang = lng;
};
i18n.on("languageChanged", syncHtmlLang);
syncHtmlLang(i18n.language);

export function useCurrentLocale(): string {
  return useSyncExternalStore(
    (onChange) => {
      i18n.on("languageChanged", onChange);
      return () => i18n.off("languageChanged", onChange);
    },
    () => i18n.resolvedLanguage ?? i18n.language,
  );
}

export default i18n;
