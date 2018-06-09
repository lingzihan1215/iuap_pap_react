import React, { Component } from "react";
import TreeModule from "../treemodule/treemodule";
import TreeTableModule from "../treetable/treetablemodule";
import "./index.less";

class PlanIndexProj extends Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}
  
  render() {
    return (
      <div className="clearfix tree_content">
        <TreeModule />
        <TreeTableModule />
      </div>
    );
  }
}

PlanIndexProj.propTypes = {};

export default PlanIndexProj;
