import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Table,
  Button,
  Col,
  Row,
  Tree,
  FormControl,
  Modal,
} from "tinper-bee";
const TreeNode = Tree.TreeNode;
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
    console.log("selected", info);
  }
  //新增树节点
  onAddTable = () => {
    console.log("00");
    this.setState({
      showModal: true
    });
  };
  // 关闭新增
  onAddClose = () => {
    this.setState({
      showModal: false
    });
  };
  render() {
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
          <Tree
            className="myCls"
            showLine
            checkStrictly
            onSelect={this.onSelectTree}
          >
            <TreeNode title="parent 0" key="0-0">
              <TreeNode title="parent 0-0" key="0-0-0" />
            </TreeNode>
            <TreeNode title="parent 1" key="0-1">
              <TreeNode title="parent 1-0" key="0-1-0" />
            </TreeNode>
          </Tree>
        </Col>
        <Modal show={this.state.showModal} onHide={this.onAddClose}>
          <Modal.Header>
            <Modal.Title>这是题目</Modal.Title>
          </Modal.Header>

          <Modal.Body>这是一些描述。。。</Modal.Body>

          <Modal.Footer>
            <Button
              onClick={this.onAddClose}
              shape="border"
              style={{ marginRight: 50 }}
            >
              关闭
            </Button>
            <Button onClick={this.onAddClose} colors="primary">
              确认
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    );
  }
}

TreeModule.propTypes = {};

export default TreeModule;
