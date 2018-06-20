import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import Form from 'bee-form';
import { Col, Row, FormControl,Label,Select,Table,Button } from "tinper-bee";
import SearchPanel from 'components/SearchPanel';
import Header from 'components/Header';
import DatePicker from 'bee-datepicker';
import moment from "moment/moment";
import 'bee-datepicker/build/DatePicker.css';
import './index.less';

const { RangePicker } = DatePicker;
const Option = Select.Option;
const FormItem = Form.FormItem;

/**
 * ExampleRoot Component
 */
class ExampleRoot  extends Component {
    constructor(props) { // 如果不需要state可不写
        super(props);
        this.state = {
            voucherDate:[]
        }
    }
    componentWillMount() {
        
    }

    componentDidMount() {
        actions.orderTest.getSelect();
        actions.orderTest.loadList();
    }

    search = (error,values)=>{
        console.log(values)   
    }
    
    reset=()=>{
        this.setState({
            voucherDate:[]
        })
    }
    cellClick=()=>{
        
    }
    /**
     * 获取列表
     */
    getColumnData(){
        return []
    }

    render() {
        console.log(this.props);
        const column = [
            {
                title: "序号",
                dataIndex: "index",
                key: "index",
                render(record, text, index) {
                    return index + 1;
                }
            },
            {
                title: "订单编号",
                dataIndex: "orderCode",
                key: "orderCode",
                onCellClick: (record) => this.cellClick(record, false)
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
                render(record, text, index) {
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
                render(text, record, index) {
                    return (
                        <div className='operation-btn'>
                            <Button size='sm' className='edit-btn' onClick={() => { self.cellClick(record, true) }}>编辑</Button>
                        </div>
                    )
                }
            }
        ];
        
        let {orderTypes,list} = this.props;
        const { getFieldProps, getFieldError } = this.props.form;
        const self=this;
        return (
            <div className='manage-order-manage'> 
                <Header title='订单测试'/>
                <SearchPanel form={this.props.form} search={this.search} reset={this.reset}>
                    <Row>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>角色编码：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('roleCode', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>角色名称：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('roleName', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>角色描述：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('roleDescribe', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col  md={4} xs={6}>
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
                    </Row>
                </SearchPanel>
                <div className="table-list">
                    <Table columns={column} data={list} />
                </div>
            </div>
        )
    }
}
export default Form.createForm()(ExampleRoot);