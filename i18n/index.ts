import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './locales/en.json';

const fallbackLng = 'en-US';

const resources = {
  'en-US': { translation: translationEn },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem('language');

  if (!savedLanguage) {
    savedLanguage = Localization.getLocales()[0].languageCode || fallbackLng;
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng,
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
