import React, { Component } from "react";
import { Router } from "mirrorx";

import LayoutHeader from './LayoutHeader';
import Sidebar from './Sidebar/index.js';
import Routes from "../routes";
import "./index.less";

export default class MainLayout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
          <div className="honey-container">
              { (__MODE__ == "development") ?  <Sidebar /> : "" }
              <div className="page-layout">
                  { (__MODE__ == "development") ? <LayoutHeader /> : "" }
                  <Routes />
              </div>
          </div>
      </Router>
    );
  }
}

