import React, { Component } from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import mirror, { connect } from 'mirrorx';
import {Locale} from 'tinper-bee';

import zh_CN from './locales/zh-Hans-CN';
import en_US from './locales/en-US';

let intlModel = {
    name: "intl",
    initialState: {
        lang: "zh-CN"
    },
    reducers: {
        updateState(state, data) { 
            return {
                ...state,
                ...data
            };
        }
    },
    effects: {

    }
}

mirror.model(intlModel);

class Inter extends Component {
  render() {
    let { tinperBee, locale, messages } = this.props.localData;
    return (
        <Locale locale={tinperBee}>
            <IntlProvider key={locale} locale={locale} messages={messages}>
                {this.props.children}
            </IntlProvider>
        </Locale>
    )
  }
};

function chooseLocale(val) {
  let _val = val || navigator.language.split('_')[0];
  switch (_val) {
    case 'en-US':
      return en_US;
    case "zh-CN":
      return zh_CN;
    default:
      return zh_CN;
  }
}

let Intl = connect(state => {
    return {
        modelData: state.intl,
        localData: chooseLocale(state.intl.lang)
    }
})(Inter);

export default Intl;