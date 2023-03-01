import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'

import lang_de from './locale/de/resource.json'
import lang_en from './locale/en/resource.json'

const resources = {
  en: {
    translation: lang_en
  },
  de: {
    translation: lang_de
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'de',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
