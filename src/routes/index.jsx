/*
* 路由表
* */
import React from "react";
import { Router, Route } from "mirrorx";
import Layout from "layout";

import MST from "modules/mst/router";
import PPM from "modules/ppm/router";
import order from 'modules/order/router';

import MainLayout from '../layout'
import './index.less'

const App = () => (
  <Router>
    <div>
      <MainLayout />
      <div className="layout-content">
        {/* 主子表路由 */}
        <Route path="/mst" component={MST} />
        {/* 树表路由 */}
        <Route path="/ppm" component={PPM} />
        {/* 订单管理 */}
        <Route path="/order" component={order} />
      </div>
    </div>
  </Router>
);

export default App;
