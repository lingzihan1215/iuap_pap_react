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
        let { userName, creditLine, totalCredit, accountsReceivable, 
            saleValue, specialLiabilities, overdue, unmadeDelivery, 
            creditDisclosure, tax
        } = this.props.customerCredit;
        return [
            { name: "客户简称", codeName: "userName", value: userName },
            { name: "信用额度", codeName: "creditLine", value: creditLine },
            { name: "授信总额", codeName: "totalCredit", value: totalCredit },
            { name: "应收账款", codeName: "accountsReceivable", value: accountsReceivable },
            { name: "销售值", codeName: "saleValue", value: saleValue },
            { name: "特殊负债", codeName: "specialLiabilities", value: specialLiabilities },
            { name: "应收逾期", codeName: "overdue", value: overdue },
            { name: "未结交货", codeName: "unmadeDelivery", value: unmadeDelivery },
            { name: "授信揭露", codeName: "creditDisclosure", value: creditDisclosure },
            { name: "税率", codeName: "tax", value: tax }
        ]
    } 
    
    RenderCells({ name, codeName, value, index }) {
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <Col key={index} md={4} xs={6}>
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