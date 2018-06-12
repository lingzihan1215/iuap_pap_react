import React, { Component } from "react";
import Form from "bee-form";
import { FormControl, Label, Row, Col } from "tinper-bee";
import "./contracttitle.less";
const FormItem = Form.FormItem;
class ContractTitle extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className="contract_title">
        <div>合同抬头</div>
        <Form>
          <Row>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>买方:</Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <FormControl
                    placeholder=""
                    {...getFieldProps("username", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入买方"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("username")}</span>
                </Col>
              </FormItem>
            </Col>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>卖方</Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <FormControl
                    placeholder=""
                    {...getFieldProps("username", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入卖方"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("username")}</span>
                </Col>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>买方名称:</Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <FormControl
                    placeholder="买方名称"
                    {...getFieldProps("username", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入买方名称"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("username")}</span>
                </Col>
              </FormItem>
            </Col>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>卖方名称</Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <FormControl
                    placeholder=""
                    {...getFieldProps("username", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入卖方名称"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("username")}</span>
                </Col>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>卖家:</Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <FormControl
                    placeholder="卖家"
                    {...getFieldProps("username", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入用户名"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("username")}</span>
                </Col>
              </FormItem>
            </Col>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>用户名：</Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <FormControl
                    placeholder="请输入用户名(包含数字和字母，8-15位)"
                    {...getFieldProps("username", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入用户名"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("username")}</span>
                </Col>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>卖家:</Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <FormControl
                    placeholder="卖家"
                    {...getFieldProps("username", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入用户名"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("username")}</span>
                </Col>
              </FormItem>
            </Col>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>用户名：</Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <FormControl
                    placeholder="请输入用户名(包含数字和字母，8-15位)"
                    {...getFieldProps("username", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入用户名"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("username")}</span>
                </Col>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
export default Form.createForm()(ContractTitle);
