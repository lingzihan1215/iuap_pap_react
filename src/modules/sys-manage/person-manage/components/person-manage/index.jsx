import React, { Component } from "react";
import { actions } from "mirrorx";

import Header from 'components/Header'
import TreeModule from "../tree-module/TreeModule";
import TreeTableModule from "../tree-table/TreeTableModule";

import "./index.less";

class PlanIndexProj extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    actions.PlanIndexProj.load()
    // actions.PlanIndexProj.load();
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div className="clearfix tree_content">
        <Header title={'角色管理'} back={true}>
          
        </Header>
        <TreeModule />
        <TreeTableModule />
      </div>
    );
  }
}

PlanIndexProj.propTypes = {};

export default PlanIndexProj;
