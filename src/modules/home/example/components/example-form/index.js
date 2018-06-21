import React, { Component } from 'react'
import { actions } from "mirrorx";
import { Col, Row,FormControl, Label, Select, Radio } from "tinper-bee";
import Form from 'bee-form';
import DatePicker from 'bee-datepicker';
import 'bee-datepicker/build/DatePicker.css';
import SearchPanel from 'components/SearchPanel';
const FormItem = Form.FormItem;
const { RangePicker } = DatePicker;
import './index.less'

class BoardForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            approvalState: '',
            closeState: '',
            confirmState: '',
            voucherDate: []
        }
    }
    /** 查询数据
     * @param {*} error 校验是否成功
     * @param {*} values 表单数据
     */
    search = (error,values) => {
        let voucherDate = values.voucherDate;
        if (voucherDate && voucherDate.length) {
            values.starTime = voucherDate[0].format('YYYY-MM-DD');
            values.endTime = voucherDate[1].format('YYYY-MM-DD');
        } else {
            values.starTime = '';
            values.endTime = '';
        }
        delete values.voucherDate;
        values.pageIndex = this.props.pageIndex || 0,
        values.pageSize = this.props.pageSize || 10,
        actions.example.loadList(values);
    }
    reset = () => {//重置
        this.setState({
            approvalState: '',
            closeState: '',
            confirmState: '',
            voucherDate: []
        })
    }
    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        const { orderTypes } = this.props;
        return (
            <SearchPanel form={this.props.form} reset={this.reset} search={this.search}>
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
                                    orderTypes.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.code}>{item.name}</Option>
                                        )
                                    })
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
                </Row>
            </SearchPanel>
        )
    }
}

export default Form.createForm()(BoardForm)