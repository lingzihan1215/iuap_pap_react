import React, { Component } from "react";
import { actions, connect } from "mirrorx";
import PropTypes from "prop-types";
import { FormControl, Label, Col, Modal, Button } from "tinper-bee";
import Form from "bee-form";
import "./treeform.less";
const FormItem = Form.FormItem;
class TreeForm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}
  // 新增提交
  submit = () => {
    this.props.form.validateFields((error, value) => {
      if (!error) {
        actions.PlanIndexProj.addTreeData(value);
      }
    });
  };
  //新增树节点
  onAddTable = () => {};
  // 关闭新增
  onAddClose = () => {
    actions.PlanIndexProj.showModul(false);
  };
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className="tree_form">
        <Modal show={this.props.showModul} onHide={this.onAddClose}>
          <Modal.Header>
            <Modal.Title>{this.props.showText}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Col md={6} xs={6} sm={6}>
                <Col md={4} xs={4} sm={4}>
                  <Label>编码:</Label>
                </Col>
                <Col md={8} xs={8} sm={8}>
                  <FormControl
                    initialValue=""
                    placeholder="编码"
                    {...getFieldProps("code", {
                      validateTrigger: "onBlur",
                      initialValue: "",
                      rules: [
                        {
                          required: true,
                          message: "请输入编码"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("code")}</span>
                </Col>
              </Col>
              <Col md={6} xs={6} sm={6}>
                <Col md={4} xs={4} sm={4}>
                  <Label>组织名称:</Label>
                </Col>
                <Col md={8} xs={8} sm={8}>
                  <FormControl
                    placeholder="组织名称"
                    {...getFieldProps("username", {
                      validateTrigger: "onBlur",
                      initialValue: "",
                      rules: [
                        {
                          required: true,
                          message: "请输入组织名称"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("username")}</span>
                </Col>
              </Col>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={this.onAddClose}
              shape="border"
              style={{ marginRight: 10 }}
            >
              关闭
            </Button>
            <Button onClick={this.submit} colors="primary">
              确认
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

TreeForm.propTypes = {};

export default connect(state => state.PlanIndexProj)(
  Form.createForm()(TreeForm)
);
