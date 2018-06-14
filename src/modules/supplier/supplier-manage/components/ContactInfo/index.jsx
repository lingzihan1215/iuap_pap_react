import React, { Component } from 'react';
import {Row,Col,FormControl,Button} from 'tinper-bee';
import Form from 'bee-form';
import './index.less';

const FormItem = Form.FormItem;
const fieldArray = ["busincontact",];

class ContactInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        const { getFieldProps, getFieldError,getFieldDecorator} = this.props.form;
        return (
            <div className="supplier-page">
                <div className="supplier-user-head">联系人信息:</div>
                <div className="contact-info-form">
                    <Form>
                        <Row>
                            <div className="clearfix mt20">
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="contact-label-adjust">业务联系人&nbsp;:&nbsp; </span>
                                        <FormControl className="contact-input-adjust"
                                            {
                                            ...getFieldProps('busincontact', {
                                                initialValue: "小王",
                                                validateTrigger: 'onBlur',
                                                rules: [{ required: false, message: '请选择业务联系人!' }],
                                            })
                                            }
                                        />
                                    </FormItem>
                                </Col>
                                <Col className="height40" md={4} mdOffset={1} xs={4} xsOffset={1} sm={4} smOffset={1}>
                                    <FormItem>
                                        <span className="contact-label-adjust">联系方式&nbsp;:&nbsp; </span>
                                        <FormControl className="contact-input-adjust"
                                            {
                                            ...getFieldProps('contactinfo', {
                                                initialValue: "18022188392",
                                                validateTrigger: 'onBlur',
                                                rules: [{ required: true, message: '请填写手机号码' }],
                                            })
                                            }
                                        />
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

export default Form.createForm()(ContactInfo);