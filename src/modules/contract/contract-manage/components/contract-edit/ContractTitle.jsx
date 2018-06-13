import React, { Component } from "react";
import Form from "bee-form";
import { FormControl, Label, Row, Col, Icon } from "tinper-bee";
import DatePicker from "bee-datepicker";
import "./contracttitle.less";
const format = "YYYY-MM-DD HH:mm:ss";
const dateInputPlaceholder = "选择日期";
const FormItem = Form.FormItem;
class ContractTitle extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return [
      <div className="contract_title">
        <div>
          <Icon className="uf-files-o" />合同抬头
        </div>
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
                    {...getFieldProps("buy", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入买方"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("buy")}</span>
                </Col>
              </FormItem>
            </Col>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>卖方:</Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <FormControl
                    placeholder=""
                    {...getFieldProps("sell", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入卖方"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("sell")}</span>
                </Col>
              </FormItem>
            </Col>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>买方名称:</Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <FormControl
                    placeholder=""
                    {...getFieldProps("buyname", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入买方名称"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("buyname")}</span>
                </Col>
              </FormItem>
            </Col>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>
                    卖方名称: <span>*</span>{" "}
                  </Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <FormControl
                    placeholder=""
                    {...getFieldProps("sellname", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入卖方名称"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("sellname")}</span>
                </Col>
              </FormItem>
            </Col>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>
                    合同开始日期: <span>*</span>
                  </Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <DatePicker
                    {...getFieldProps("contractstart", {})}
                    format={format}
                    placeholder={dateInputPlaceholder}
                  />
                  <span className="error">
                    {getFieldError("contractstart")}
                  </span>
                </Col>
              </FormItem>
            </Col>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>
                    供应商状态: <span>*</span>{" "}
                  </Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <FormControl
                    placeholder=""
                    {...getFieldProps("supplystate", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入供应商状态"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("supplystate")}</span>
                </Col>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>,
      <div className="contract_title">
        <div>
          <Icon className="uf-files-o" />合同项目
        </div>
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
                    {...getFieldProps("buy", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入买方"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("buy")}</span>
                </Col>
              </FormItem>
            </Col>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>卖方:</Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <FormControl
                    placeholder=""
                    {...getFieldProps("sell", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入卖方"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("sell")}</span>
                </Col>
              </FormItem>
            </Col>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>买方名称:</Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <FormControl
                    placeholder=""
                    {...getFieldProps("buyname", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入买方名称"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("buyname")}</span>
                </Col>
              </FormItem>
            </Col>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>
                    卖方名称: <span>*</span>{" "}
                  </Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <FormControl
                    placeholder=""
                    {...getFieldProps("sellname", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入卖方名称"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("sellname")}</span>
                </Col>
              </FormItem>
            </Col>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>
                    合同开始日期: <span>*</span>
                  </Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <DatePicker
                    {...getFieldProps("contractstart", {})}
                    format={format}
                    placeholder={dateInputPlaceholder}
                  />
                  <span className="error">
                    {getFieldError("contractstart")}
                  </span>
                </Col>
              </FormItem>
            </Col>
            <Col md={6} xs={6} sm={6}>
              <FormItem>
                <Col md={3} xs={3} sm={3}>
                  <Label>
                    供应商状态: <span>*</span>{" "}
                  </Label>
                </Col>
                <Col md={9} xs={9} sm={9}>
                  <FormControl
                    placeholder=""
                    {...getFieldProps("supplystate", {
                      validateTrigger: "onBlur",
                      rules: [
                        {
                          required: true,
                          message: "请输入供应商状态"
                        }
                      ]
                    })}
                  />
                  <span className="error">{getFieldError("supplystate")}</span>
                </Col>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    ];
  }
}
export default Form.createForm()(ContractTitle);
