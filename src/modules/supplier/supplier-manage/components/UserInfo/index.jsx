import React, { Component } from 'react';
import {Row,Col,FormControl,Select,Label,Button} from 'tinper-bee';
import Form from 'bee-form';
import './index.less';

const Option = Select.Option;
const FormItem = Form.FormItem;
const fieldArray = [
    "suppliername","firmnature","unisocialcode",
    "contactname","phonenum","email","identifycode"
]

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    onGetVerifyCode = ()=>{
        
    }
    render() {
        const { getFieldProps, getFieldError,getFieldDecorator} = this.props.form;
        return (
            <div className="supplier-page">
                <div >
                    <div className="supplier-user-head">用户信息:</div>
                    <div className="supplier-user-form">
                        <Form>
                            <Row>
                                <div className="clearfix mt20">
                                    <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                        <FormItem>
                                            <span className="supplier-label-adjust">审核意见: </span>
                                            <span className="supplier-head-label supplier-width-adjust pd3">[信息变更:]审批通过</span>
                                        </FormItem>
                                    </Col>
                                </div>
                                
                                <div className="clearfix mt20">
                                    <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                        <FormItem>
                                            <span className="supplier-label-adjust">用户名&nbsp;:&nbsp; </span>
                                            <span className="supplier-head-label pd3">327464</span>
                                        </FormItem>
                                    </Col>
                                    <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                        <FormItem>
                                            <span className="supplier-label-adjust">供应商名称&nbsp;:&nbsp; </span>
                                            <span className="supplier-icon-adjust">*</span>
                                            <FormControl  className="supplier-input-adjust"

                                                {...getFieldProps('suppliername', {
                                                    initialValue:   "供应商名称",
                                                    validateTrigger: 'onBlur',
                                                    rules: [{
                                                        type: 'string', required: true, message: '请输入供应商名称',
                                                    }],
                                                })} />
                                            <span className='error'>
                                                {getFieldError('suppliername')}
                                            </span>
                                        </FormItem>
                                    </Col>
                                </div>
                                <div className="clearfix mt20">
                                    <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                        <FormItem>
                                            <span className="supplier-label-adjust">企业性质&nbsp;:&nbsp; </span>
                                            <span className="supplier-icon-adjust">*</span>
                                            <Select
                                                className = "supplier-sel-adjust"
                                                defaultValue={"私营企业"}
                                                searchPlaceholder="标签模式"
                                                {
                                                ...getFieldProps('firmnature', {
                                                    initialValue: "私营企业",
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: true, message: '请选择工单类型!' }],
                                                })
                                                }
                                            >
                                                <Option value="私营企业">私营企业</Option>
                                                <Option value="国营企业">国营企业</Option>
                                                <Option value="股份制企业">股份制企业</Option>
                                                <Option value="其他">其他</Option>
                                            </Select>
                                            <span className='error'>
                                                {getFieldError('firmnature')}
                                            </span>
                                        </FormItem>
                                    </Col>
                                    <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                        <FormItem>
                                            <span className="supplier-label-adjust">统一社会信用代码&nbsp;:&nbsp; </span>
                                            <span className="supplier-icon-adjust">*</span>
                                            <FormControl className = "supplier-input-adjust"
                                                {
                                                ...getFieldProps('unisocialcode', {
                                                    initialValue: "统一社会信用代码",
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: true, message: '请填写统一社会信用代码' }],
                                                })
                                                }
                                            />
                                            <span className='error'>
                                                {getFieldError('unisocialcode')}
                                            </span>
                                        </FormItem>
                                    </Col>
                                </div>
                                <div className="clearfix mt20">
                                    <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                        <FormItem>
                                            <span className="supplier-label-adjust">联系人姓名&nbsp;:&nbsp; </span>
                                            <span className="supplier-icon-adjust">*</span>
                                            <FormControl className = "supplier-input-adjust"
                                                {
                                                ...getFieldProps('contactname', {
                                                    initialValue: "小王",
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: true, message: '请选择联系人姓名!' }],
                                                })
                                                }
                                            />
                                            <span className='error'>
                                                {getFieldError('contactname')}
                                            </span>
                                        </FormItem>
                                    </Col>
                                    <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                        <FormItem>
                                            <span className="supplier-label-adjust">手机号码&nbsp;:&nbsp; </span>
                                            <span className="supplier-icon-adjust">*</span>
                                            <FormControl className = "supplier-input-adjust"
                                                {
                                                ...getFieldProps('phonenum', {
                                                    initialValue: "18022188392",
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: true, message: '请填写手机号码' }],
                                                })
                                                }
                                            />
                                            <span className='error'>
                                                {getFieldError('phonenum')}
                                            </span>
                                        </FormItem>
                                    </Col>
                                </div>
                                <div className="clearfix mt20">
                                    <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                        <FormItem>
                                            <span className="supplier-label-adjust">电子邮箱&nbsp;:&nbsp; </span>
                                            <span className="supplier-icon-adjust">*</span>
                                            <FormControl className = "supplier-input-adjust"
                                                {
                                                ...getFieldProps('email', {
                                                    initialValue: "",
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: true, message: '请选择电子邮箱!' }],
                                                })
                                                }
                                            />
                                            <span className='error'>
                                                {getFieldError('email')}
                                            </span>
                                            
                                        </FormItem>
                                    </Col>
                                    <Col md={1} xs={1} sm={1}>
                                        <Button className="editable-add-btn supplier-btn" size="sm" colors="primary" onClick={this.onGetVerifyCode}>获取验证码</Button>
                                    </Col>
                                    <Col className="height40" md={4}  xs={4}  sm={4} >
                                        <FormItem>
                                            <span className="supplier-label-adjust">验证码&nbsp;:&nbsp; </span>
                                            <span className="supplier-icon-adjust">*</span>
                                            <FormControl className = "supplier-input-adjust"
                                                {
                                                ...getFieldProps('identifycode', {
                                                    initialValue: "",
                                                    validateTrigger: 'onBlur',
                                                    rules: [{ required: true, message: '请输入验证码' }],
                                                })
                                                }
                                            />
                                            <span className='error'>
                                                {getFieldError('identifycode')}
                                            </span>
                                        </FormItem>
                                    </Col>
                                </div>
                               
                                
                            </Row>
                        </Form>
                    </div>
                </div>

            </div>
        );
    }
}

export default Form.createForm()(UserInfo);