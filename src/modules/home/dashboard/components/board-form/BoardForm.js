import React, { Component } from 'react'
import { Loading, Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select, Radio } from "tinper-bee";
import Form from 'bee-form';
import DatePicker from 'bee-datepicker';
import 'bee-datepicker/build/DatePicker.css';
const FormItem = Form.FormItem;
const { RangePicker } = DatePicker;

import './index.less'

class BoardForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectData: [],
            approvalState: '',
            closeState: '',
            confirmState: '',
            voucherDate: []
        }
    }
    search = (pageObj) => {//查询
        this.props.form.validateFields((err, values) => {
            let voucherDate = values.voucherDate;
            if (voucherDate && voucherDate.length) {
                values.starTime = voucherDate[0].format('YYYY-MM-DD');
                values.endTime = voucherDate[1].format('YYYY-MM-DD');
            } else {
                values.starTime = '';
                values.endTime = '';
            }
            delete values.voucherDate;

            values.pageIndex = pageObj.pageIndex || this.props.pageIndex || 1,
            values.pageSize = pageObj.pageSize || this.props.pageSize || 10;
        });
    }
    reset = () => {//重置
        this.props.form.resetFields();
        this.setState({
            approvalState: '',
            closeState: '',
            confirmState: '',
            voucherDate: []
        })
    }
    render(){
        
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <div className='board-form search-panel'>
                <Row>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>订单编号：</Label>
                            <FormControl
                                {
                                ...getFieldProps('orderCode', {
                                    initialValue: '',
                                })
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>供应商名称：</Label>
                            <FormControl
                                {
                                ...getFieldProps('supplierName', {
                                    initialValue: '',
                                })
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col md={4} xs={4}>
                        <FormItem>
                            <Label className='time'>凭证日期：</Label>
                            <RangePicker
                                defaultValue={this.state.voucherDate}
                                placeholder={'开始 ~ 结束'}
                                dateInputPlaceholder={['开始', '结束']}
                                {
                                ...getFieldProps('voucherDate', {
                                    onChange: function (v) {
                                        self.setState({
                                            voucherDate: v
                                        })
                                    }
                                })
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>订单类型：</Label>
                            <Select {
                                ...getFieldProps('type', {
                                    initialValue: '',
                                }
                                )}>
                                <Option value="">请选择</Option>
                                {
                                    // orderTypes.map((item, index) => {
                                    //     return (
                                    //         <Option key={index} value={item.code}>{item.name}</Option>
                                    //     )
                                    // })
                                }
                            </Select>
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>采购组：</Label>
                            <FormControl
                                {
                                ...getFieldProps('purchasingGroup', {
                                    initialValue: '',
                                })
                                }
                            />
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>审批状态：</Label>
                            <Radio.RadioGroup
                                selectedValue={this.state.approvalState}
                                {
                                ...getFieldProps('approvalState', {
                                    initialValue: '',
                                    onChange(value) {
                                        self.setState({ approvalState: value });
                                    },
                                }
                                )}
                            >
                                <Radio value="0" >未审批</Radio>
                                <Radio value="1" >已审批</Radio>
                                <Radio value="" >全部</Radio>
                            </Radio.RadioGroup>
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>关闭状态：</Label>
                            <Radio.RadioGroup
                                selectedValue={this.state.closeState}
                                {
                                ...getFieldProps('closeState', {
                                    initialValue: '',
                                    onChange(value) {
                                        self.setState({ closeState: value });
                                    },
                                }
                                )}
                            >
                                <Radio value="0" >未关闭</Radio>
                                <Radio value="1" >已关闭</Radio>
                                <Radio value="" >全部</Radio>
                            </Radio.RadioGroup>
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <FormItem>
                            <Label>确认状态：</Label>
                            <Radio.RadioGroup
                                selectedValue={this.state.confirmState}
                                {
                                ...getFieldProps('confirmState', {
                                    initialValue: '',
                                    onChange(value) {
                                        self.setState({ confirmState: value });
                                    },
                                }
                                )}
                            >
                                <Radio value="0" >未确认</Radio>
                                <Radio value="1" >已确认</Radio>
                                <Radio value="2" >拒绝</Radio>
                                <Radio value="" >全部</Radio>
                            </Radio.RadioGroup>
                        </FormItem>
                    </Col>
                    <Col md={12} xs={12} className='btn-group'>
                        <Button size='sm' className='reset-btn' onClick={this.reset}>清空</Button>
                        <Button size='sm' className='submit-btn' onClick={this.search}>查询</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.createForm()(BoardForm)