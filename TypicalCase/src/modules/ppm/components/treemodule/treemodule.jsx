import React, { Component } from "react";
import { actions, connect } from "mirrorx";
import PropTypes from "prop-types";
import TreeForm from "../treeform/treeform";
import { Table, Button, Col, Row, Tree, FormControl, Modal } from "tinper-bee";
const TreeNode = Tree.TreeNode;
const loop = data =>
  data.map(item => {
    if (item.parent_id) {
      return (
        <TreeNode key={item.parent_id} title={item.parent_id}>
          {loop(item)}
        </TreeNode>
      );
    }
    return <TreeNode key={item.parent_id} title={item.parent_id} />;
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
    console.log(this.props);
    setTimeout(() => {
      console.log(this.props);
    }, 4000);
  }

  componentWillReceiveProps(nextProps) {}
  // 选择树节点
  onSelectTree(info) {
    console.log("selected", info);
  }
  onAddTable = () => {
    actions.PlanIndexProj.showModul(true);
  };
  render() {
    let { treeData } = this.props;
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
            {treeData.map(item => {
              if (item.parent_id) {
                return (
                  <TreeNode title={item.instit_name} key={item.instit_name} />
                );
              } else {
                return (
                  <TreeNode title={item.instit_name} key={item.instit_name} />
                );
              }
            })}
            {/* {loop(treeData)} */}
          </Tree>
        </Col>
        <TreeForm />
      </Col>
    );
  }
}

TreeModule.propTypes = {};

export default connect(state => state.PlanIndexProj)(TreeModule);
