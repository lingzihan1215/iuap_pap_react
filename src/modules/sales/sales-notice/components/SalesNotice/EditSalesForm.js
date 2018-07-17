import React, { Component } from 'react';
import { actions } from 'mirrorx';
import Form from 'bee-form';
import { Col, Row, FormControl, Label, Select, Radio, Switch, Button, Message } from "tinper-bee";
const FormItem = Form.FormItem;
import moment from 'moment';
import DatePicker from 'bee-datepicker';
import 'bee-datepicker/build/DatePicker.css';
import classNames from 'classnames'

class EditSalesForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            enableFlag: true
        }
        this.wharf = [
            { key: "001", value: "天津港"},
            { key: "002", value: "大连码头"},
            { key: "003", value: "青岛港"}
        ]
    }
    getCellsData(){
        const { getFieldProps, getFieldError } = this.props.form;
        let _this = this;

        return [
            { name: "船名", codeName: "shipName" },
            { name: "航次", codeName: "flightNum" },
            { name: "联络人", codeName: "liaisons" },
            { name: "船公司", codeName: "shipCompany" },
            { name: "电话", codeName: "phone" },
            { name: "目的港", codeName: "destinationPort" },
            // { name: "SAO", codeName: "customerName" },
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
            } }
        ]
    } 
    
    RenderCells({ name, codeName, value, index, children }) {
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <Col key={index} md={4} xs={6}>
                <FormItem>
                    <Label>{name}：</Label>
                    { (typeof children == "function") ? children() : (
                        <FormControl className="form-item" disabled={this.state.enableFlag}
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
    /**
     * 获取填写的销货通知单表单信息的数据
     */
    saveForm(){
        let _this = this;

        this.props.form.validateFields((error,values)=>{
            if(error) {
                Message.create({ content: '请继续完善信息', color: 'warning' });
                return ;
            }
            values.settlementTime = values.settlementTime.format('YYYY-MM-DD')

            _this.getFormData(values)
        })
    }
    /**
     * 获取所有数据，执行提交保存操作
     */
    async getFormData(values){
        let tableEditedData = this.props.tableEditedData;

        if(tableEditedData && tableEditedData.length) {
            let result = await actions.salesNotice.postAllData({
                formData: values,
                tableEditedData
            });
            
            if (result.data.success) {
                Message.create({ content: '保存成功', color: 'success' });
            }
        } else {
            Message.create({ content: '请完善销货单明细信息', color: 'warning' });
        } 
    }
    /**
     * 设置是否可编辑的状态位
     */
    setEnableFlag = () => {
        this.setState({
            enableFlag: !this.state.enableFlag
        })
    }
    /**
     * 设置按钮样式和显示隐藏
     */
    setButtonStyles = () => {
        return {
            createBtnStyles: classNames({ 
                'btn-sales-create': this.state.enableFlag,
                'btn-sales-create-disable': !this.state.enableFlag
             }),
             handlerBtnStyles: classNames({ 
                'is-btn-show': this.state.enableFlag,
                'btn-handler': true
             })
        }
    }
    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        let _this = this;
        let { createBtnStyles, handlerBtnStyles } = this.setButtonStyles();
        let setEnableFlag = this.state.setEnableFlag;
        let btnDisabledFlag = !setEnableFlag ? "disabled" : "";

        return (
            <div className="edit-sales-form common-panel edit-panel">
                <div className="form-handler-aria">
                    <Button 
                        btnDisabledFlag
                        className={createBtnStyles}
                        onClick={this.setEnableFlag.bind(this)}>建立销货通知单</Button>
                    <Button 
                        className={handlerBtnStyles}
                        onClick={this.saveForm.bind(this)}>保存</Button>
                    <Button 
                        className={handlerBtnStyles}
                        onClick={this.setEnableFlag.bind(this)}>取消</Button>
                </div>
                <Row className="edit-body">
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>销货单号：</Label><span className='mast'>*</span>
                            <FormControl className="form-item" disabled={this.state.enableFlag}
                                {
                                ...getFieldProps('orderNo', {
                                    initialValue: '',
                                    rules: [{required: true,message: "请输入单号"}]
                                })
                                }
                            />
                            <span className='error'>
                                {getFieldError('orderNo')}
                            </span>
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                                <Label className='time'>出货结算日：</Label><span className='mast'>*</span>
                                <DatePicker className="form-item" format={'YYYY-MM-DD'}  disabled={this.state.enableFlag}
                                    {
                                        ...getFieldProps('settlementTime', {
                                            initialValue: moment(),
                                        })
                                    }
                                />
                            </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>码头：</Label><span className='mast'>*</span>
                            <Select className='form-item' disabled={this.state.enableFlag}  {
                                ...getFieldProps('wharf', {
                                    initialValue: '',
                                    rules: [{required: true,message: "请输入船公司名称"}]
                                })
                            }>
                                {
                                    this.wharf.map(item => <option key={item.key} value={item.key}>{item.value}</option> )
                                }
                            </Select>
                            <span className='error'>
                                {getFieldError('wharf')}
                            </span>
                        </FormItem>
                    </Col>
                    {_this.getCellsData().map((item, index) => {
                        let args = {...item, index};
                        return _this.RenderCells(args)
                    })}
                </Row>
                <Row>
                    <Col md={12} sm={9} xs={6}>
                        <Label style={{ marginLeft: "10px", float: "left", width: "90px"}}>备注信息：</Label>
                        <FormItem>
                            <textarea
                                    placeholder="请输入描述"
                                    disabled={this.state.enableFlag}
                                    {
                                        ...getFieldProps('orderRemark', {
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