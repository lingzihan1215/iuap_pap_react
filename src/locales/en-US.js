import EN from 'tinper-bee/locale/en_US.js';
import appLocaleData from 'react-intl/locale-data/en';
import enMessages from '../../locales/en.json';

window.appLocale = {
  messages: {
    ...enMessages,
  },
  tinperBee: EN,
  locale: 'en-US',
  data: appLocaleData,
};
