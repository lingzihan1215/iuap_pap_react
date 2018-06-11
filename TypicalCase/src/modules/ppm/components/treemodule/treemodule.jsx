import React, { Component } from "react";
import { actions, connect } from "mirrorx";
import PropTypes from "prop-types";
import TreeForm from "../treeform/treeform";
import { Table, Button, Col, Row, Tree, FormControl, Modal } from "tinper-bee";
const TreeNode = Tree.TreeNode;

const x = 3;
const y = 2;
const z = 1;
const gData = [];

const generateData = (_level, _preKey, _tns) => {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
        const key = `${preKey}-${i}`;
        tns.push({ title: key, key });
        if (i < y) {
            children.push(key);
        }
    }
    if (_level < 0) {
        return tns;
    }
    const level = _level - 1;
    children.forEach((key, index) => {
        tns[index].children = [];
        return generateData(level, key, tns[index].children);
    });
};
generateData(z);

console.log( JSON.stringify(gData))

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
    console.log(item.children);
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

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {}
  // 选择树节点
  onSelectTree(info) {
    console.log(info);
    actions.PlanIndexProj.getTable('?pageIndex=0&pageSize=5&sortField=peocode&sortDirection=asc&institid=536aab12-819f-48b4-93f5-5ac8f76b1f4b&_=1528706592935')
  }
  onAddTable = () => {
    actions.PlanIndexProj.showModul(true);
  };
  render() {
    let { treeData } = this.props;
    console.log(setTreeData(treeData));
    return (
      <Col md={4} xs={4} sm={4}>
        <Col md={4} xs={4} sm={4}>
          <span className="tree_heard"> 组织结构</span>
        </Col>
        <Col md={8} xs={8} sm={8}>
          <Button colors="primary" onClick={this.onAddTable}>
            增加
          </Button>
          <Button colors="primary">修改</Button>
          <Button colors="danger">删除</Button>
        </Col>
        <Col md={12} xs={12} sm={12}>
          <Tree className="myCls" showLine onSelect={this.onSelectTree}>
            {treeData ? loop(treeData) : ""}
          </Tree>
        </Col>
        <TreeForm />
      </Col>
    );
  }
}

TreeModule.propTypes = {};

export default connect(state => state.PlanIndexProj)(TreeModule);
