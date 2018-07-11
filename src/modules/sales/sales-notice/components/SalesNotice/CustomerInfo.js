import React, { Component } from 'react';
import { actions } from 'mirrorx';

import Form from 'bee-form';
import { Col, Row, FormControl, Label, Select, Radio } from "tinper-bee";
const FormItem = Form.FormItem;
import CommonTitle from '../CommonTitle/index';

class CustomerInfo extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    getCellsData(){
        let { customerName, edu } = this.props.customerInfo;
        return [
            { name: "客户简称", codeName: "customerName", value: customerName },
            { name: "信用额度", codeName: "edu", value: edu },
            { name: "授信总额", codeName: "customerName", value: customerName },
            { name: "应收账款", codeName: "customerName", value: customerName },
            { name: "销售值", codeName: "customerName", value: customerName },
            { name: "特殊负债", codeName: "customerName", value: customerName },
            { name: "应收逾期", codeName: "customerName", value: customerName },
            { name: "未结交货", codeName: "customerName", value: customerName },
            { name: "授信揭露", codeName: "customerName", value: customerName },
            { name: "税率", codeName: "customerName", value: customerName }
        ]
    } 
    
    RenderCells({ name, codeName, value, index }) {
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <Col key={index} md={3} xs={6}>
                <FormItem>
                    <Label>
                        {name}：
                    </Label>
                    <FormControl className='form-item' disabled={true}
                        {
                            ...getFieldProps(codeName, {
                                initialValue: value || '',
                            })
                        }
                    />
                </FormItem>
            </Col>
        )
    } 
   
    render(){
       
        return (
            <div className="edit-panel">
                <CommonTitle title="客户信用资料" type="uf-building" />
                <Row className='edit-body'>
                    {this.getCellsData().map((item, index) => {
                        let args = Object.assign(item, {index})
                        return this.RenderCells(args)
                    })}
                </Row>
                
            </div>
        )
    }
}

export default Form.createForm()(CustomerInfo)