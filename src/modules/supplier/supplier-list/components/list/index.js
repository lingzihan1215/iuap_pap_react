import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import { Loading, Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select, Radio } from "tinper-bee";
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
        }
    }
    componentDidMount() {
        actions.supplier.loadList();
    }
    search = (pageObj) => {//查询
        this.props.form.validateFields((err, values) => {
            values.pageIndex = pageObj.pageIndex || this.props.pageIndex || 1,
                values.pageSize = pageObj.pageSize || this.props.pageSize || 10,
                actions.supplier.loadList(values);
        });
    }
    reset = () => {
        this.props.form.resetFields();
    }

    cellClick = (record) => {
        actions.routing.push(
            {
                pathname: 'detail',
                detailObj: record
            }
        )
    }
    onPageSelect = (value) => {
        actions.supplier.loadList({
            pageIndex: value,
            pageSize: this.props.pageSize,
        })
    }
    dataNumSelect = (value) => {
        let pageSize = (value + 1) * 5;//针对于5条/10条/15条/20条选项
        actions.supplier.loadList({
            pageSize: pageSize,
            pageIndex: 1
        })
    }
    render() {
        const self = this;
        const column = [
            {
                title: "序号",
                dataIndex: "id",
                key: "id",
                width: 50
            },
            {
                title: "供应商编码",
                dataIndex: "unisocialcode",
                key: "unisocialcode",
                width: 100,
                onCellClick: this.cellClick
            },
            {
                title: "供应商名称",
                dataIndex: "suppliername",
                key: "suppliername",
                width: 300
            },
            {
                title: "注册资金",
                dataIndex: "identifycode",
                key: "identifycode",
                width: 100
            },
            {
                title: "联系人",
                dataIndex: "entrepresent",
                key: "entrepresent",
                width: 100
            },
            {
                title: "手机号码",
                dataIndex: "phonenum",
                key: "phonenum",
                width: 100
            },
            {
                title: "主要产品",
                dataIndex: "firmnature",
                key: "firmnature",
                width: 100
            },
            {
                title: "供应商类别",
                dataIndex: "province",
                key: "province",
                width: 100
            },
            {
                title: "主供货品类",
                dataIndex: "engname",
                key: "engname",
                width: 100
            },
            {
                title: "可供货品类",
                dataIndex: "email",
                key: "email",
                width: 100
            }
        ];
        let { form, list, pageSize, pageIndex, totalPages, orderTypes, showLoading } = this.props;
        const { getFieldProps, getFieldError } = form;
        return (
            <div className='supplier-list'>
                <Header title='供应商管理' back={true} />
                <div className='search-panel'>
                    <Row>
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
                                <Label>关联设备名称：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('equipmentName', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>可供货品类：</Label>
                                <Select {
                                    ...getFieldProps('usableGoods', {
                                        initialValue: '',
                                    }
                                    )}>
                                    <Option value="">请选择</Option>
                                    <Option value="1">品类一</Option>
                                    <Option value="2">品类二</Option>
                                    <Option value="3">品类三</Option>
                                    <Option value="4">品类四</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>供应商类别：</Label>
                                <Select {
                                    ...getFieldProps('supplierCategory', {
                                        initialValue: '',
                                    }
                                    )}>
                                    <Option value="">请选择</Option>
                                    <Option value="1">类别一</Option>
                                    <Option value="2">类别二</Option>
                                    <Option value="3">类别三</Option>
                                    <Option value="4">类别四</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>供应商类型：</Label>
                                <Select {
                                    ...getFieldProps('supplierType', {
                                        initialValue: '',
                                    }
                                    )}>
                                    <Option value="">请选择</Option>
                                    <Option value="1">类型一</Option>
                                    <Option value="2">类型二</Option>
                                    <Option value="3">类型三</Option>
                                    <Option value="4">类型四</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>主供货品类：</Label>
                                <Select {
                                    ...getFieldProps('mainGoods', {
                                        initialValue: '',
                                    }
                                    )}>
                                    <Option value="">请选择</Option>
                                    <Option value="1">类别一</Option>
                                    <Option value="2">类别二</Option>
                                    <Option value="3">类别三</Option>
                                    <Option value="4">类别四</Option>
                                </Select>
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
                        loading={{ show: showLoading, loadingType: "line" }}
                        rowKey={(r, i) => i}
                        scroll={{ x: true, y: 500 }}
                        columns={column}
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
                            activePage={pageIndex}
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
