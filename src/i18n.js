import { initReactI18next } from 'react-i18next'
import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from 'i18next'

import lang_de from '../locale/de/translation.json'
import lang_en from '../locale/en/translation.json'

const resources = {
  en: {
    translation: lang_en
  },
  de: {
    translation: lang_de
  }
}

export async function loadLanguage() {
  const lng = await AsyncStorage.getItem('language')
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      resources,
      lng: lng ? lng : 'de',
      interpolation: {
        escapeValue: false // react already safes from xss
      },
      keySeparator: '>',
      nsSeparator: '|'
    })
}

export default i18n
