import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import { Loading,Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select,Radio } from "tinper-bee";
import Form from 'bee-form';
import Pagination from 'bee-pagination';
import 'bee-pagination/build/Pagination.css';
import DatePicker from 'bee-datepicker';
import Header from "components/Header";
import multiSelect from "tinper-bee/lib/multiSelect.js";
import 'bee-datepicker/build/DatePicker.css';
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
        actions.order.loadList();//table数据
        actions.order.getOrderType();//订单类型下拉框
    }
    search = (pageObj) => {//查询
        this.props.form.validateFields((err, values) => {
            let voucherDate=values.voucherDate;
            if(voucherDate&&voucherDate.length){
                values.starTime=voucherDate[0].format('YYYY-MM-DD');
                values.endTime=voucherDate[1].format('YYYY-MM-DD');
            }else{
                values.starTime='';
                values.endTime='';
            }
            delete values.voucherDate;
            values.pageIndex=pageObj.pageIndex||this.props.pageIndex||1,
            values.pageSize=pageObj.pageSize||this.props.pageSize||10,
            actions.order.loadList(values);
        });
    }
    reset = () => {//重置
        this.props.form.resetFields();
        this.setState({
            approvalState:'',
            closeState:'',
            confirmState:'',
            voucherDate:[]
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
                    width: 50,
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

    cellClick=(record,editFlag)=>{//进入详情
        actions.routing.push(
            {
                pathname: 'managedetail',
                detailObj: record,
                editFlag:!!editFlag
            }
        )
    }
    onPageSelect = (value) => {
        this.search({
            pageIndex: value ,
            pageSize:this.props.pageSize
        })
    }
    dataNumSelect = (value) => {
        let pageSize = (value + 1) * 5;//针对于5条/10条/15条/20条选项
        this.search({
            pageSize: pageSize,
            pageIndex: 1
        })
    }
    delItem=(record,index)=>{
        actions.order.delItem({
            param:[{id:record.id}],
            index:index
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
                render(record,text,index){
                    return index+1;
                }
            },
            {
                title: "订单编号",
                dataIndex: "orderCode",
                key: "orderCode",
                width: 200,
                onCellClick:(record)=>this.cellClick(record,false)
            },
            {
                title: "供应商名称",
                dataIndex: "supplierName",
                key: "supplierName",
                width: 300
            },
            {
                title: "类型",
                dataIndex: "type_name",
                key: "type_name",
                width: 100
            },
            {
                title: "采购组织",
                dataIndex: "purchasing",
                key: "purchasing",
                width: 100
            },
            {
                title: "采购组",
                dataIndex: "purchasingGroup",
                key: "purchasingGroup",
                width: 100
            },
            {
                title: "凭证日期",
                dataIndex: "voucherDate",
                key: "voucherDate",
                width: 100,
                render(record,text,index){
                    return moment(text).format('YYYY-MM-DD')
                }
            },
            {
                title: "审批状态",
                dataIndex: "approvalState_name",
                key: "approvalState_name",
                width: 100
            },
            {
                title: "确认状态",
                dataIndex: "confirmState_name",
                key: "confirmState_name",
                width: 100
            },
            {
                title: "关闭状态",
                dataIndex: "closeState_name",
                key: "closeState_name",
                width: 100
            },
            {
                title: "操作",
                dataIndex: "e",
                key: "e",
                render(text,record,index){
                    return (
                        <div className='operation-btn'>
                            <Button size='sm' className='edit-btn' onClick={()=>{self.cellClick(record,true)}}>编辑</Button>
                            <Button size='sm' className='del-btn' onClick={()=>{self.delItem(record,index)}}>删除</Button>
                        </div>
                    )
                }
            }
        ];
        let { form, list, pageSize, pageIndex, totalPages,orderTypes,showLoading } = this.props;
        const { getFieldProps, getFieldError } = form;
        let columns = this.renderColumnsMultiSelect(column);
        return (
            <div className='order-list'>
                <Header title='采购订单管理' back={true} />
                <div className='search-panel'>
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
                                        ) }
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
                                        ) }
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
                <div className='table-list'>
                    <div className='table-header'>
                        <Button size='sm' shape="border" onClick={()=>{self.cellClick({},true)}}>
                           新增
                        </Button>
                    </div>
                    <MultiSelectTable
                        loading={{show:showLoading,loadingType:"line"}}
                        rowKey={(r,i)=>i}
                        scroll={{x : true,y: 500 }}
                        columns={columns}
                        data={list}
                        multiSelect={{ type: "checkbox" }}
                        getSelectedDataFunc={this.tabelSelect}
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
