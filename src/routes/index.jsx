/*
* 路由表
* */
import React, { Component } from "react";
import { Router, Route } from "mirrorx";

// Routers
import order from "modules/order/router";
import interimplan from "modules/interimplan/router";
import resource from "modules/resource/router";
import Supplier from "modules/supplier/router";
import contracts from "modules/contract/router";
import system from 'modules/sys-manage/router';
import templates from 'modules/templates/router';

import MainLayout from "layout";
import "./index.less";

const MainRoutes = () => (
  <div>
    <Route path="/order" component={order} />
    <Route path="/supplier" component={Supplier} />
    <Route path="/contract" component={contracts} />
    <Route path="/system" component={system} />
    <Route path="/interimplan" component={interimplan} />
    <Route path="/resource" component={resource} />
    <Route path="/templates" component={templates} />
  </div>
)

class App extends React.Component {
  render(){
    return (
      <Router>
        <div>
          { (__MODE__ == "development") ? <MainLayout /> : "" }
          <div className="route-content">
            { (__MODE__ == "development") ? <div className="layout-content"><MainRoutes /></div> : <MainRoutes/> }
          </div>
        </div>
      </Router>
    )
  }
}


export default App;
