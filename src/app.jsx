/**
 * 整个应用的入口，包含路由，数据管理加载
 */

import React, {Component} from "react";
import 'core-js/es6/map';
import 'core-js/es6/set';
import logger from "redux-logger";
import mirror, {render} from "mirrorx";
import { addLocaleData, IntlProvider } from 'react-intl';
import {Locale} from 'tinper-bee';
import MainLayout from "./layout";

import './static/trd/tineper-bee/assets/tinper-bee.css'
import "./app.less";

const MiddlewareConfig = [];

const appLocale = window.appLocale;

addLocaleData(appLocale.data);

if (__MODE__ == "development") MiddlewareConfig.push(logger);

mirror.defaults({
    historyMode: "hash",
    middlewares: MiddlewareConfig
});

render(
    <Locale locale={appLocale.tinperBee}>
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
            <MainLayout />
        </IntlProvider>
    </Locale>,
    document.querySelector("#app"));
