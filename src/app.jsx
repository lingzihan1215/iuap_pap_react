/**
 * 整个应用的入口，包含路由，数据管理加载
 */

import React, { Component } from "react";
import logger from "redux-logger";
import mirror, { render } from "mirrorx";
import Routes from "./routes";
import "tinper-bee/assets/tinper-bee.css";
import "./app.less";

const MiddlewareConfig = [];

if(__MODE__ == "development") MiddlewareConfig.push(logger);

mirror.defaults({
    historyMode: "hash",
    middlewares: MiddlewareConfig
});

render(<Routes />, document.querySelector("#app"));