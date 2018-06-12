import React, { Component } from "react";
import Form from "bee-form";
import { FormControl, Label, Row, Col } from "tinper-bee";
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
      <div>
        <div>合同抬头</div>
        <Form>
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
                        },
                        {
                          pattern: /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{8,15}$/,
                          message: "用户名格式错误"
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
