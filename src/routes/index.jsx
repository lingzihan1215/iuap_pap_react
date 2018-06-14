/*
* 路由表
* */
import React, { Component } from "react";
import { Router, Route } from "mirrorx";
import order from "modules/order/router";
import Supplier from "modules/supplier/router";
import contracts from "modules/contract/router";
import MainLayout from "layout";
import system from 'modules/sys-manage/router';
import "./index.less";

const MainRoutes = () => (
  <div>
    <Route path="/order" component={order} />
    <Route path="/supplier" component={Supplier} />
    <Route path="/contract" component={contracts} />
    <Route path="/system" component={system} />
  </div>
)

class App extends Component {
  render(){
    return (
      <Router>
        <div className="route-content">
          { (__MODE__ == "development") ? <MainLayout /> : "" }
          { (__MODE__ == "development") ? <div className="layout-content"><MainRoutes /></div> : <MainRoutes/> }
        </div>
      </Router>
    )
  }
}


export default App;
