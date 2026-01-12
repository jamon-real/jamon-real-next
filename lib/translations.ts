import esTranslations from "@/locales/es.json"
import enTranslations from "@/locales/en.json"

export const translations = {
  es: esTranslations,
  en: enTranslations,
}

export type Language = keyof typeof translations

export function getTranslations(lang: Language = "es") {
  return translations[lang] || translations.es
}
