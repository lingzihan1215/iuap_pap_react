import CN from 'tinper-bee/locale/zh-cn.js';
import appLocaleData from 'react-intl/locale-data/zh';
import zhMessages from '../../locales/zh.json';

window.appLocale = {
  messages: {
    ...zhMessages,
  },
  tinperBee: CN,
  locale: 'zh-Hans-CN',
  data: appLocaleData,
};
