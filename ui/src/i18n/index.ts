import { createI18n, type I18nOptions, type LocaleMessages, type VueMessageType } from 'vue-i18n'
import en from './locales/en.json'

type MessageSchema = typeof en

const messages: Record<string, MessageSchema> = {
  en: { ...en },
}

const options: I18nOptions = {
  legacy: false,
  locale: 'en', // Idioma por defecto
  fallbackLocale: 'en', // Idioma de respaldo
  messages, // Proporcionamos las traducciones
}

const i18n = createI18n(options)

export default i18n
