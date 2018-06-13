import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import { Loading,Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select,Radio } from "tinper-bee";
import Form from 'bee-form';
import Pagination from 'bee-pagination';
import 'bee-pagination/build/Pagination.css';
import Header from "components/Header";
import './index.less';
const FormItem = Form.FormItem;


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            approvalState:'',
            closeState:'',
            confirmState:'',
            voucherDate:[]
        }
    }
    componentDidMount() {
        actions.supplier.loadList();
        actions.supplier.getOrderType();
    }
    search = () => {//查询
        this.props.form.validateFields((err, values) => {
            actions.supplier.loadList(values);
        });
    }
    reset = () => {
        this.props.form.resetFields();
        this.setState({
            approvalState:'',
            closeState:'',
            confirmState:'',
            voucherDate:[]
        })
    }

    cellClick=(record)=>{
        actions.routing.push(
            {
                pathname: 'managedetail',
                detailObj: record
            }
        )
    }
    onPageSelect = (value) => {
        actions.supplier.loadList({
            pageActive: value ,
            pageSize: this.props.pageSize,
        })
    }
    dataNumSelect = (value) => {
        let pageSize = (value + 1) * 5;//针对于5条/10条/15条/20条选项
        actions.supplier.loadList({
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
                width: 50,
                render(record,text,index){
                    return index;
                }
            },
            {
                title: "供应商编码",
                dataIndex: "supplierCode",
                key: "supplierCode",
                width: 100,
                onCellClick:this.cellClick
            },
            {
                title: "供应商名称",
                dataIndex: "supplierName",
                key: "supplierName",
                width: 300
            },
            {
                title: "注册资金",
                dataIndex: "registeredCapital",
                key: "registeredCapital",
                width: 100
            },
            {
                title: "近一年营业额",
                dataIndex: "turnover",
                key: "turnover",
                width: 100
            },
            {
                title: "联系人",
                dataIndex: "contacts",
                key: "contacts",
                width: 100
            },
            {
                title: "手机号码",
                dataIndex: "phone",
                key: "phone",
                width: 100
            },
            {
                title: "主要产品",
                dataIndex: "mainProducts",
                key: "mainProducts",
                width: 100
            },
            {
                title: "供应商类别",
                dataIndex: "supplierCategory",
                key: "supplierCategory",
                width: 100
            },
            {
                title: "供应商类型",
                dataIndex: "supplierType",
                key: "supplierType",
                width: 100
            },
            {
                title: "主供货品类",
                dataIndex: "mainGoods",
                key: "mainGoods",
                width: 100
            },
            {
                title: "可供货品类",
                dataIndex: "usableGoods",
                key: "usableGoods",
                width: 100
            },
        ];
        let { form, list, pageSize, pageActive, totalPages,orderTypes,showLoading } = this.props;
        const { getFieldProps, getFieldError } = form;
        return (
            <div className='supplier-list'>
            <Loading
                showBackDrop={true}
                loadingType="line"
                show={showLoading}
            />

                <Header title='供应商管理' />
                <div className='search-panel'>
                    <Row>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>采购订单号：</Label>
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
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label className='time'>凭证日期：</Label>
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
                                <Label>订单类型：</Label>
                                <Select {
                                    ...getFieldProps('type', {
                                        initialValue: '',
                                    }
                                    ) }>
                                    <Option value="">请选择</Option>
                                    {
                                        supplierTypes.map((item,index)=>{
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
                                        ) }
                                    >
                                    <Radio value="unconfirmed" >未确认</Radio>
                                    <Radio value="confirmed" >已确认</Radio>
                                    <Radio value="refuse" >拒绝</Radio>
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
                <div className='table-list'>
                    <div className='table-header'>
                        <Button size='sm' shape="border">
                           导出
                        </Button>
                    </div>
                    <Table
                        rowKey={(r,i)=>i}
                        scroll={{x : true,y: 500 }}
                        columns={columns}
                        data={list}
                    />
                    <div className='pagination'>
                    <Pagination
                        first
                        last
                        prev
                        next
                        boundaryLinks
                        items={totalPages}
                        activePage={pageActive}
                        onDataNumSelect={this.dataNumSelect}
                        onSelect={this.onPageSelect}
                        showJump={true}
                    />
                </div>
                </div>
            </div>
        )
    }
}

export default Form.createForm()(List);
