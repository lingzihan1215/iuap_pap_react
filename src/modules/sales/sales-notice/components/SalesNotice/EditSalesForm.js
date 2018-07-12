import React, { Component } from 'react';
import { actions } from 'mirrorx';

import Form from 'bee-form';
import { Col, Row, FormControl, Label, Select, Radio, Switch } from "tinper-bee";
const FormItem = Form.FormItem;
import moment from 'moment';
import DatePicker from 'bee-datepicker';
import 'bee-datepicker/build/DatePicker.css';
import CommonTitle from '../CommonTitle/index';

class EditSalesForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            checked: true
        }
    }
    getCellsData(){
        const { getFieldProps, getFieldError } = this.props.form;
        let _this = this;

        return [
            { name: "船名", codeName: "customerName" },
            { name: "航次", codeName: "edu" },
            { name: "码头", codeName: "customerName" },
            { name: "20尺", codeName: "customerName" },
            { name: "40尺", codeName: "customerName" },
            { name: "散装", codeName: "customerName" },
            { name: "CFS", codeName: "customerName" },
            { name: "SAO", codeName: "customerName" },
            { name: "中午前结算", codeName: "isSettlement", children: () => {
                return (
                    <Switch
                        checked={this.state.checked}
                        
                        {
                            ...getFieldProps("isSettlement", {
                                initialValue: '',
                                onChange(){
                                    _this.setState({
                                        checked: !_this.state.checked
                                    });
                                }
                            })
                        }
                    />
                )
            } },
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
    
    RenderCells({ name, codeName, value, index, children }) {
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <Col key={index} md={4} xs={6}>
                <FormItem>
                    <Label>{name}：</Label>
                    { (typeof children == "function") ? children() : (
                        <FormControl className="form-item"
                            {
                                ...getFieldProps(codeName, {
                                    initialValue: ''
                                })
                            }
                        />
                    )}
                    <span className='error'>
                        {getFieldError(codeName)}
                    </span>
                </FormItem>
            </Col>
        )
    } 
   
    render(){
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div className="edit-sales-form common-panel edit-panel">
                <CommonTitle title="销货通知单信息填写" type="uf-pencil-c" />
                <Row className="edit-body">
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>销货单号：</Label>
                            <FormControl className="form-item"
                                {
                                ...getFieldProps('customerCode', {
                                    initialValue: '',
                                    rules: [{ }]
                                })
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                                <Label className='time'>结算日：</Label><span className='mast'>*</span>
                                <DatePicker className="form-item" format={'YYYY-MM-DD'}
                                    {
                                        ...getFieldProps('voucherDate', {
                                            initialValue: '',
                                        })
                                    }
                                />
                            </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>船公司：</Label><span className='mast'>*</span>
                            <Select className='form-item' {
                                ...getFieldProps('transportation', {
                                    initialValue: '',
                                    rules: [{required: true,message: "请输入船公司名称"}]
                                })
                            }>
                                <Option value="0">中船重工</Option>
                                <Option value="1">大连航运</Option>
                                <Option value="2">铁路</Option>
                                <Option value="3">航空</Option>
                            </Select>
                            <span className='error'>
                                {getFieldError('customerCode')}
                            </span>
                        </FormItem>
                    </Col>
                    {this.getCellsData().map((item, index) => {
                        let args = Object.assign(item, { index})
                        return this.RenderCells(args)
                    })}
                </Row>
                <Row>
                    <Col md={12} sm={9} xs={6}>
                        <Label style={{ marginLeft: "10px", float: "left", width: "90px"}}>备注信息：</Label>
                        <FormItem>
                            <textarea
                                    placeholder="请输入描述"
                                    {
                                        ...getFieldProps('roleDescribe', {
                                            initialValue: "",
                                        }
                                    ) }
                                />
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.createForm()(EditSalesForm)