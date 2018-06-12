import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import { Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select } from "tinper-bee";
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

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectData: []
        }
    }
    componentDidMount() {
        actions.order.loadList();
    }
    search = () => {//查询
        actions.order.loadList(

        )
    }
    reset = () => {

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
            pageIndex: value - 1,
            searchName: decodeURIComponent(this.props.form.getFieldValue('searchName')),
            searchCode: decodeURIComponent(this.props.form.getFieldValue('searchCode')),
        })
    }
    dataNumSelect = (value) => {
        let pageSize = (value + 1) * 5;//针对于5条/10条/15条/20条选项
        actions.order.load({
            pageSize: pageSize,
            pageIndex: 0,
            searchName: decodeURIComponent(this.props.form.getFieldValue('searchName')),
            searchCode: decodeURIComponent(this.props.form.getFieldValue('searchCode')),
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
                dataIndex: "orderName",
                key: "orderName",
                width: 100
            },
            {
                title: "供应商名称",
                dataIndex: "customer",
                key: "customer",
                width: 200
            },
            {
                title: "类型",
                dataIndex: "busiman",
                key: "busiman",
            },
            {
                title: "采购组织",
                dataIndex: "dept",
                key: "dept",
            },
            {
                title: "采购组",
                dataIndex: "dept",
                key: "dept",
            },
            {
                title: "凭证日期",
                dataIndex: "orderState",
                key: "orderState",
            },
            {
                title: "审批状态",
                dataIndex: "orderState",
                key: "orderState",
            },
            {
                title: "确认状态",
                dataIndex: "orderState",
                key: "orderState",
            },
            {
                title: "关闭状态",
                dataIndex: "orderState",
                key: "orderState",
            },
        ];
        let { form, list, pageSize, pageActive, totalPages } = this.props;
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
                                    ...getFieldProps('code', {
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
                                    ...getFieldProps('code', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>凭证日期：</Label>
                                <RangePicker
                                placeholder={'开始 ~ 结束'}
                                dateInputPlaceholder={['开始', '结束']}
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>订单类型：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('code', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>采购组：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('code', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>审批状态：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('code', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>关闭状态：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('code', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>确认状态：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('code', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <Button>查询</Button>
                            <Button>重置</Button>
                        </Col>
                    </Row>
                </div>
                <div className='table-list'>
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
