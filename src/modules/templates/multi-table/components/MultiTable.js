import React, { Component } from 'react'
import { Loading, Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select, Radio } from "tinper-bee";
import moment from "moment/moment";
import { actions } from "mirrorx";
import SearchPanel from 'components/SearchPanel';
import Form from 'bee-form';
import Pagination from 'bee-pagination';
import 'bee-pagination/build/Pagination.css';
import DatePicker from 'bee-datepicker';
const { RangePicker } = DatePicker;
import './index.less';
const FormItem = Form.FormItem;

class MultiTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectData: [],
            approvalState: '',
            closeState: '',
            confirmState: '',
            voucherDate: []
        }
    }
    componentDidMount() {
        actions.multi.loadParent();//table数据
        actions.multi.getOrderType();//订单类型下拉框
    }
    /**
     * 查询
     */
    search = (pageObj, err, values) => {
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
            values.pageSize = pageObj.pageSize || this.props.pageSize || 10,
            actions.order.loadList(values);
    }

    /**
     * 获得主表数据
     */
    getParentList = (pageObj) => {
        this.props.form.validateFields((err, values) => {
            this.search(pageObj, err, values);
        });
    }

    reset = () => {
        this.setState({
            approvalState: '',
            closeState: '',
            confirmState: '',
            voucherDate: []
        })
    }

    onPageSelect = (value) => {
        this.getParentList({
            pageIndex: value,
            pageSize: this.props.pageSize
        })
    }

    dataNumSelect = (value) => {
        let pageSize = (value + 1) * 5;//针对于5条/10条/15条/20条选项
        this.getParentList({
            pageSize: pageSize,
            pageIndex: 1
        })
    }

    /**
     * 主表行点击事件，请求子表数据
     */
    rowclick = (record, index) => {
        actions.multi.loadChild(record.id);
    };


    render() {
        const self = this;
        const { listParent, listChild, showLoadingParent, showLoadingChild, pageSize, pageIndex, totalPages, form, orderTypes } = this.props;
        const { getFieldProps, getFieldError } = form;
        const columnParent = [
            {
                title: "序号",
                dataIndex: "index",
                key: "index"
            },
            {
                title: "订单编号",
                dataIndex: "orderCode",
                key: "orderCode"
            },
            {
                title: "供应商名称",
                dataIndex: "supplierName",
                key: "supplierName"
            },
            {
                title: "类型",
                dataIndex: "type_name",
                key: "type_name"
            },
            {
                title: "采购组织",
                dataIndex: "purchasing",
                key: "purchasing"
            },
            {
                title: "采购组",
                dataIndex: "purchasingGroup",
                key: "purchasingGroup"
            },
            {
                title: "凭证日期",
                dataIndex: "voucherDate",
                key: "voucherDate",
                width: 100,
                render(record, text, index) {
                    return moment(text).format('YYYY-MM-DD')
                }
            },
            {
                title: "审批状态",
                dataIndex: "approvalState_name",
                key: "approvalState_name"
            },
            {
                title: "确认状态",
                dataIndex: "confirmState_name",
                key: "confirmState_name"
            },
            {
                title: "关闭状态",
                dataIndex: "closeState_name",
                key: "closeState_name"
            }
        ];
        const columnChild = [
            {
                title: "序号",
                dataIndex: "index",
                key: "index"
            },
            {
                title: "订单编号",
                dataIndex: "orderCode",
                key: "orderCode"
            },
            {
                title: "供应商名称",
                dataIndex: "supplierName",
                key: "supplierName"
            },
            {
                title: "类型",
                dataIndex: "type_name",
                key: "type_name"
            },
            {
                title: "采购组织",
                dataIndex: "purchasing",
                key: "purchasing"
            },
            {
                title: "采购组",
                dataIndex: "purchasingGroup",
                key: "purchasingGroup"
            }
        ];
        return (
            <div className="multi-table table-list">
                <SearchPanel form={form} search={(error, values) => { this.search({}, error, values) }} reset={this.reset}>
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
                <Table
                    loading={{ show: showLoadingParent, loadingType: "line" }}
                    columns={columnParent}
                    data={listParent}
                    onRowClick={this.rowclick}
                    title={currentData => <div>主表</div>}
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

                <Table
                    loading={{ show: showLoadingChild, loadingType: "line" }}
                    columns={columnChild}
                    data={listChild}
                    // onRowClick={this.rowclick}
                    title={currentData => <div>子表</div>}
                />

            </div>
        )
    }
}

export default Form.createForm()(MultiTable);