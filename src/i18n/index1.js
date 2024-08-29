import { I18n } from 'i18n-js';
import th from './th.json';
import en from './en.json';
const i18n = new I18n({
  en,
  th,
});
i18n.fallbacks = true;

i18n.defaultLocale = 'en';
i18n.locale = 'en';

export default i18n;
