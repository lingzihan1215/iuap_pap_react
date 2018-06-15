import React, { Component } from "react";
import { actions, connect } from "mirrorx";
import TreeForm from "../tree-form/TreeForm";
import { Button, Col, Row, Tree, FormControl, Modal } from "tinper-bee";

import './index.less'

const TreeNode = Tree.TreeNode;

const setTreeData = data => {
  let parentArr = [];
  if (Array.isArray(data) && data.length) {
    data.map(item => {
      if (!item.parent_id) {
        parentArr.push(item);
        item.children = [];
      }
      parentArr.map(iitem => {
        if (iitem.institid == item.parent_id) {
          iitem.children.push(item);
        }
      });
    });
    return parentArr;
  }
};

const loop = data =>
  data.map(item => {
    if (item.children) {
      return (
        <TreeNode key={item.institid} title={item.instit_name}>
          {loop(item.children)}
        </TreeNode>
      );
    } else {
      return <TreeNode key={item.institid} title={item.instit_name} />;
    }
  });
class TreeModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}
  // 选择树节点
  onSelectTree(info) {
    actions.PlanIndexProj.onTreeClick(info);
    actions.PlanIndexProj.getTable(
      `?pageIndex=0&pageSize=5&sortField=peocode&sortDirection=asc&institid=${info}`
    );
  }
  
  render() {
    let { treeData } = this.props;
    treeData.length ? (treeData = setTreeData(treeData)) : treeData;
    return (
      <div className="org-tree">
        <span className="tree_heard"> 组织结构</span>
        <Tree className="myCls" showLine onSelect={this.onSelectTree}>
          {treeData ? loop(treeData) : ""}
        </Tree>
        <TreeForm />
      </div>
    );
  }
}

TreeModule.propTypes = {};

export default connect(state => state.PlanIndexProj)(TreeModule);
