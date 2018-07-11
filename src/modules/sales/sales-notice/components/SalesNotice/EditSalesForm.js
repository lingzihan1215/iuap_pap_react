import React, { Component } from 'react';
import { actions } from 'mirrorx';

import Form from 'bee-form';
import { Col, Row, FormControl, Label, Select, Radio } from "tinper-bee";
const FormItem = Form.FormItem;

class EditSalesForm extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    getCellsData(){
        return [
            { name: "船名", codeName: "customerName" },
            { name: "航次", codeName: "edu" },
            { name: "码头", codeName: "customerName" },
            { name: "20尺", codeName: "customerName" },
            { name: "40尺", codeName: "customerName" },
            { name: "散装", codeName: "customerName" },
            { name: "CFS", codeName: "customerName" },
            { name: "SAO", codeName: "customerName" },
            { name: "中午前结算", codeName: "customerName" },
            { name: "联络人", codeName: "customerName" },
            { name: "电话", codeName: "customerName" },
            { name: "目的港", codeName: "customerName" },
            { name: "每船限重", codeName: "customerName" },
            { name: "公证行", codeName: "customerName" },
            { name: "领货地点", codeName: "customerName" },
            { name: "领货号码", codeName: "customerName" },
            { name: "交货地点", codeName: "customerName" },
            { name: "揽货公司", codeName: "customerName" }
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
                    <FormControl  
                        {
                            ...getFieldProps(codeName, {
                                initialValue: ''
                            })
                        }
                    />
                </FormItem>
            </Col>
        )
    } 
   
    render(){
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div className="edit-sales-form common-panel edit-panel">
                <Row>
                    <Col md={3} xs={6}>
                        <FormItem>
                            <Label>销货单号：</Label>
                            <FormControl  
                                {
                                ...getFieldProps('customerCode', {
                                    initialValue: '',
                                    rules: [{ }]
                                })
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col md={3} xs={6}>
                        <FormItem>
                            <Label>出货/结算日：</Label>
                            <FormControl  
                                {
                                ...getFieldProps('customerCode', {
                                    initialValue: '',
                                    rules: [{ }]
                                })
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col md={3} xs={6}>
                        <FormItem>
                            <Label>船公司：</Label>
                            <FormControl  
                                {
                                ...getFieldProps('customerCode', {
                                    initialValue: '',
                                    rules: [{ }]
                                })
                                }
                            />
                        </FormItem>
                    </Col>
                    {this.getCellsData().map((item, index) => {
                        let args = Object.assign(item, { index})
                        return this.RenderCells(args)
                    })}
                </Row>
            </div>
        )
    }
}

export default Form.createForm()(EditSalesForm)