import React, { Component } from "react";
import { Router } from "mirrorx";

import LayoutHeader from './Header';
import Sidebar from './Sidebar';
import Routes from "../routes";
import "./index.less";

export default class MainLayout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <div className="app">
          { (__MODE__ == "development") ? <LayoutHeader /> : "" }
          <div className="layout-container">
            { (__MODE__ == "development") ?  <Sidebar /> : "" }
            <div className="layout-content">
              <Routes />
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

