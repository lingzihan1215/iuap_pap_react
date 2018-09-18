import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import { Loading, Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select, Radio } from "tinper-bee";
import Form from 'bee-form';
import Pagination from 'bee-pagination';
import NoData from 'components/NoData';
import 'bee-pagination/build/Pagination.css';
import DatePicker from 'bee-datepicker';
import Header from "components/Header";
import multiSelect from "tinper-bee/lib/multiSelect.js";
import 'bee-datepicker/build/DatePicker.css';
import { Scrollbars } from 'react-custom-scrollbars';
import SearchPanel from 'components/SearchPanel';
import './list.less';
const MultiSelectTable = multiSelect(Table, Checkbox);
const FormItem = Form.FormItem;
const { RangePicker } = DatePicker;
import moment from "moment/moment";


class List extends Component {
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

    componentDidMount() {//页面渲染完毕后的动作
        console.log('first enter page')
        this.getList({
            pageIndex: 1,
            pageSize: this.props.pageSize
        })
        // actions.tenant.loadList();
        // actions.multi.getOrderType();//订单类型下拉框
    }

    search = (pageObj,err,values) => {//查询
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
        actions.inter.loadList(values);
    }

    getList=(pageObj)=>{//获得表单数据
        this.props.form.validateFields((err, values) => {
            this.search(pageObj, err, values);
        });
    }

    reset = () => {//重置
        this.setState({
            approvalState: '',
            closeState: '',
            confirmState: '',
            voucherDate: []
        })
    }

    tabelSelect = (data) => {//tabel选中数据
        console.log('table select');
        this.setState({
            selectData: data
        })
    }

    // 多选表格包装函数  结束

    cellClick = (record, editFlag) => {//进入详情
        actions.routing.push(
            {
                pathname: 'managedetail',
                detailObj: record,
                editFlag: !!editFlag
            }
        )
    }

    onPageSelect = (value) => {//切换分页操作
        console.log('on page select');
        this.getList({
            pageIndex: value,
            pageSize: this.props.pageSize
        })
    }

    dataNumSelect = (value) => {//分页条数操作，针对于5条/10条/15条/20条选项
        console.log('page data num select');
        let pageSize = (value + 1) * 5;
        this.getList({
            pageSize: pageSize,
            pageIndex: 1
        })
    }

    delItem = (record, index) => {//删除
        actions.order.delItem({
            param: [{ id: record.id }],
            index: index
        });
    }

    render() {
        const self = this;
        const column = [
            {
                title: "序号",
                dataIndex: "index",
                key: "index",
                width: 50,
                render(record, text, index) {
                    return index + 1;
                }
            },
            {
                title: "资源编码",
                dataIndex: "interfaceCode",
                key: "interfaceCode",
                onCellClick: (record) => this.cellClick(record, false)
            },
            {
                title: "资源名称",
                dataIndex: "interfaceName",
                key: "interfaceName",
            },
            {
                title: "资源地址",
                dataIndex: "url",
                key: "url",
            },
            {
                title: "分页大小",
                dataIndex: "pageSize",
                key: "pageSize",
            },
            {
                title: "调用频率",
                dataIndex: "callFrequency",
                key: "callFrequency",
            },
            {
                title: "状态",
                dataIndex: "status",
                key: "status",
            }
        ];
        let { form, list, pageSize, pageIndex, totalPages, orderTypes, showLoading } = this.props;
        const { getFieldProps, getFieldError } = form;
        return (
            <div className='order-list'>
                <Header title='接口资源管理' back={true} />

                <SearchPanel form={form} search={(error,values)=>{this.search({},error,values)}} reset={this.reset}>
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

                <div className='table-list'>
                    <div className='table-header'>
                        <Button size='sm' shape="border" onClick={() => { self.cellClick({}, true) }}>
                            新增
                        </Button>
                    </div>
                    <div className="scroll-height">
                        <Scrollbars>
                            <MultiSelectTable
                                loading={{ show: showLoading, loadingType: "line" }}
                                rowKey={(r, i) => i}
                                emptyText={() => <NoData />}
                                columns={column}
                                data={list}
                                multiSelect={{ type: "checkbox" }}
                                getSelectedDataFunc={this.tabelSelect}
                            />
                        </Scrollbars>
                    </div>
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
