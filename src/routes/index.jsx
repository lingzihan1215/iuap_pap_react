/*
* 路由表
* */
import React from "react";
import { Router, Route } from "mirrorx";
import order from "modules/order/router";
import Supplier from "modules/supplier/router";
import contracts from "modules/contract/router";
import MainLayout from "layout";
import system from 'modules/sys-manage/router';
import "./index.less";

console.log(__MODE__)

const App = () => (
  <Router>
    <div>
      <MainLayout />
      <div className="layout-content">
        {/* 订单管理 */}
        <Route path="/order" component={order} />
        {/* 供应商 */}
        <Route path="/supplier" component={Supplier} />
        {/* 合同管理 */}
        <Route path="/contract" component={contracts} />
        {/* 系统管理 */}
        <Route path="/system" component={system} />
      </div>
    </div>
  </Router>
);

export default App;
