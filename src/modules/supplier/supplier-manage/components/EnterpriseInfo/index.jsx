import React, { Component } from 'react';
import {Row,Col,FormControl,Select,Label,Button} from 'tinper-bee';
import Form from 'bee-form';

import './index.less';
const Option = Select.Option;
const FormItem = Form.FormItem;
const fieldArray = [
    "engname","componyurl","companyphone","firmnature","unisocialcode",
    "contactname","phonenum","email","identifycode"
];

class EnterpriseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { getFieldProps, getFieldError,getFieldDecorator} = this.props.form;
        return (
            <div className="supplier-page">
                <div className="supplier-user-head">企业信息:</div>
                <div className="supplier-user-form">
                    <Form>
                        <Row>
                            <div className="clearfix mt20">
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">公司英文名称&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl  className="supplier-input-adjust"

                                            {...getFieldProps('engname', {
                                                initialValue:   "",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入公司英文名称',
                                                }],
                                            })} />
                                        <span className='error'>
                                            {getFieldError('engname')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">公司网址&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl  className="supplier-input-adjust"

                                            {...getFieldProps('componyurl', {
                                                initialValue:   "",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入公司网址',
                                                }],
                                            })} />
                                        <span className='error'>
                                            {getFieldError('componyurl')}
                                        </span>
                                    </FormItem>
                                </Col>
                            </div>
                            <div className="clearfix mt20">
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">公司电话&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl  className="supplier-input-adjust"

                                            {...getFieldProps('companyphone', {
                                                initialValue:   "",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入公司电话',
                                                }],
                                            })} />
                                        <span className='error'>
                                            {getFieldError('companyphone')}
                                        </span>
                                    </FormItem>
                                </Col>
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="supplier-label-adjust">公司网址&nbsp;:&nbsp; </span>
                                        <span className="supplier-icon-adjust">*</span>
                                        <FormControl  className="supplier-input-adjust"

                                            {...getFieldProps('componyurl', {
                                                initialValue:   "",
                                                validateTrigger: 'onBlur',
                                                rules: [{
                                                    type: 'string', required: true, message: '请输入公司网址',
                                                }],
                                            })} />
                                        <span className='error'>
                                            {getFieldError('componyurl')}
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
                            
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.createForm()(EnterpriseInfo);