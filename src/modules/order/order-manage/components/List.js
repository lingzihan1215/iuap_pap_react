import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import { Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select,Radio } from "tinper-bee";
import Form from 'bee-form';
import Pagination from 'bee-pagination';
import 'bee-pagination/build/Pagination.css';
import DatePicker from 'bee-datepicker';
import Header from "components/Header";
import multiSelect from "tinper-bee/lib/multiSelect.js";
import './list.less';
const MultiSelectTable = multiSelect(Table, Checkbox);
const FormItem = Form.FormItem;
const {RangePicker} = DatePicker;
import moment from "moment/moment";


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectData: [],
            approvalState:'',
            closeState:'',
            confirmState:'',
            voucherDate:[]
        }
    }
    componentDidMount() {
        actions.order.loadList();
        actions.order.getOrderType();
    }
    search = () => {//查询
        this.props.form.validateFields((err, values) => {
            console.log(values);
            actions.order.loadList(values);
        });
    }
    reset = () => {
        this.props.form.resetFields();
        this.setState({
            approvalState:'',
            closeState:'',
            confirmState:''
        })
    }
    tabelSelect = (data) => {//tabel选中数据
        this.setState({
            selectData: data
        })
    }

    // 多选表格包装函数  开始
    onAllCheckChange = () => {//全选
        let self = this;
        let checkedArray = [];
        let listData = props.listData.concat();
        let selIds = [];
        for (var i = 0; i < self.state.checkedArray.length; i++) {
            checkedArray[i] = !self.state.checkedAll;
        }
        self.setState({
            checkedAll: !self.state.checkedAll,
            checkedArray: checkedArray,
        });
    };
    onCheckboxChange = (text, record, index) => {
        let self = this;
        let allFlag = false;
        let checkedArray = self.state.checkedArray.concat();
        checkedArray[index] = !self.state.checkedArray[index];
        for (var i = 0; i < self.state.checkedArray.length; i++) {
            if (!checkedArray[i]) {
                allFlag = false;
                break;
            } else {
                allFlag = true;
            }
        }
        self.setState({
            checkedAll: allFlag,
            checkedArray: checkedArray,
        });
    };
    renderColumnsMultiSelect(columns) {
        const { data, checkedArray } = this.state;
        const { multiSelect } = this.props;
        let select_column = {};
        let indeterminate_bool = false;
        if (multiSelect && multiSelect.type === "checkbox") {
            let i = checkedArray.length;
            while (i--) {
                if (checkedArray[i]) {
                    indeterminate_bool = true;
                    break;
                }
            }
            let defaultColumns = [
                {
                    title: (
                        <Checkbox
                            className="table-checkbox"
                            checked={this.state.checkedAll}
                            indeterminate={indeterminate_bool && !this.state.checkedAll}
                            onChange={this.onAllCheckChange}
                        />
                    ),
                    key: "checkbox",
                    dataIndex: "checkbox",
                    width: "5%",
                    render: (text, record, index) => {
                        return (
                            <Checkbox
                                className="table-checkbox"
                                checked={this.state.checkedArray[index]}
                                onChange={this.onCheckboxChange.bind(this, text, record, index)}
                            />
                        );
                    }
                }
            ];
            columns = defaultColumns.concat(columns);
        }
        return columns;
    }
    // 多选表格包装函数  结束
    onPageSelect = (value) => {
        actions.order.loadList({
            pageActive: value ,
        })
    }
    dataNumSelect = (value) => {
        let pageSize = (value + 1) * 5;//针对于5条/10条/15条/20条选项
        actions.order.loadList({
            pageSize: pageSize,
            pageActive: 1
        })
    }
    render() {
        const self = this;
        const column = [
            {
                title: "序号",
                dataIndex: "index",
                key: "index",
                width: 100
            },
            {
                title: "订单编号",
                dataIndex: "orderCode",
                key: "orderCode",
                width: 100
            },
            {
                title: "供应商",
                dataIndex: "supplier",
                key: "supplier",
                width: 100
            },
            {
                title: "供应商名称",
                dataIndex: "supplierName",
                key: "supplierName",
                width: 200
            },
            {
                title: "类型",
                dataIndex: "type",
                key: "type",
            },
            {
                title: "采购组织",
                dataIndex: "purchasing",
                key: "purchasing",
            },
            {
                title: "采购组",
                dataIndex: "purchasingGroup",
                key: "purchasingGroup",
            },
            {
                title: "凭证日期",
                dataIndex: "voucherDate",
                key: "voucherDate",
            },
            {
                title: "审批状态",
                dataIndex: "approvalState",
                key: "approvalState",
            },
            {
                title: "确认状态",
                dataIndex: "confirmState",
                key: "confirmState",
            },
            {
                title: "关闭状态",
                dataIndex: "closeState",
                key: "closeState",
            },
        ];
        let { form, list, pageSize, pageActive, totalPages,orderTypes } = this.props;
        const { getFieldProps, getFieldError } = form;
        let columns = this.renderColumnsMultiSelect(column);
        return (
            <div className='order-list'>
                <Header title='采购订单管理' />
                <div className='search-panel'>
                    <Row>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>采购订单号：</Label>
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
                                <Label>供应商编码：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('supplierCode', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label className='time'>凭证日期：&nbsp;&nbsp;&nbsp;</Label>
                                <RangePicker
                                    defaultValue={this.state.voucherDate}
                                    placeholder={'开始 ~ 结束'}
                                    dateInputPlaceholder={['开始', '结束']}
                                    {
                                    ...getFieldProps('voucherDate', {
                                        onChange:function(v){
                                            self.setState({
                                                voucherDate:v
                                            })
                                        }
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>订单类型：&nbsp;&nbsp;&nbsp;</Label>
                                <Select {
                                    ...getFieldProps('orderType', {
                                        initialValue: '',
                                    }
                                    ) }>
                                    <Option value="">请选择</Option>
                                    {
                                        orderTypes.map((item,index)=>{
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
                                <Label>采购组：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Label>
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
                                <Label>审批状态：&nbsp;&nbsp;&nbsp;</Label>
                                <Radio.RadioGroup
                                selectedValue={this.state.approvalState}
                                    {
                                        ...getFieldProps('approvalState', {
                                            initialValue: '',
                                            onChange(value) {
                                                self.setState({ approvalState: value });
                                            },
                                        }
                                        ) }
                                    >
                                    <Radio value="todo" >未审批</Radio>
                                    <Radio value="done" >已审批</Radio>
                                    <Radio value="" >全部</Radio>
                                </Radio.RadioGroup>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>关闭状态：&nbsp;&nbsp;&nbsp;</Label>
                                <Radio.RadioGroup
                                selectedValue={this.state.closeState}
                                    {
                                        ...getFieldProps('closeState', {
                                            initialValue: '',
                                            onChange(value) {
                                                self.setState({ closeState: value });
                                            },
                                        }
                                        ) }
                                    >
                                    <Radio value="notclose" >未关闭</Radio>
                                    <Radio value="closed" >已关闭</Radio>
                                    <Radio value="" >全部</Radio>
                                </Radio.RadioGroup>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>确认状态：&nbsp;&nbsp;&nbsp;</Label>
                                <Radio.RadioGroup
                                    selectedValue={this.state.confirmState}
                                    {
                                        ...getFieldProps('confirmState', {
                                            initialValue: '',
                                            onChange(value) {
                                                self.setState({ confirmState: value });
                                            },
                                        }
                                        ) }
                                    >
                                    <Radio value="unconfirmed" >未确认</Radio>
                                    <Radio value="confirmed" >已确认</Radio>
                                    <Radio value="refuse" >拒绝</Radio>
                                    <Radio value="" >全部</Radio>
                                </Radio.RadioGroup>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6} className='btn-group'>
                            <Button onClick={this.search}>查询</Button>
                            <Button onClick={this.reset}>重置</Button>
                        </Col>
                    </Row>
                </div>
                <div className='table-list'>
                    <div className='table-header'>
                        <span className='table-title'>
                               采购订单列表             
                        </span>
                        <Button size='sm' shape="border">
                           导出
                        </Button>
                    </div>
                    <MultiSelectTable
                        columns={columns}
                        data={list}
                        multiSelect={{ type: "checkbox" }}
                        getSelectedDataFunc={this.tabelSelect}
                    />
                </div>
                <div className='pagination'>
                    <Pagination
                        boundaryLinks
                        items={totalPages}
                        activePage={pageActive}
                        onDataNumSelect={this.dataNumSelect}
                        onSelect={this.onPageSelect}
                        showJump={true}
                    />
                </div>

            </div>
        )
    }
}

export default Form.createForm()(List);
