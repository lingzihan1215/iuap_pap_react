/**
 * 前端路由说明：
 * 1、基于浏览器 History 的前端 Hash 路由
 * 2、按业务模块和具体页面功能划分了一级路由和二级路由
 */
import React, { Component } from "react";
import { Route } from "mirrorx";

import order from "modules/order/router";
import Supplier from "modules/supplier/router";
import contracts from "modules/contract/router";
import system from 'modules/sys-manage/router';
// 台湾-华新丽华-功能路由
import sales from 'modules/sales/router';

// 典型案例与应用组件示例
import templates from 'modules/templates/router';
import examples from 'modules/examples/router';

import MainLayout from "layout";
import "./index.less";

export default class App extends Component {
  render(){
    return (
      <div className="route-content">
        <Route path="/" exact={true} component={templates} />
        <Route path="/order" component={order} />
        <Route path="/supplier" component={Supplier} />
        <Route path="/contract" component={contracts} />
        <Route path="/system" component={system} />
        <Route path="/templates" component={templates} />
        <Route path="/examples" component={examples} />
        <Route path="/sales" component={sales} />
      </div>
    )
  }
}

