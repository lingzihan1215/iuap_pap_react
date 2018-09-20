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
            tenantStatus: ''
        }
    }

    componentDidMount() {//页面渲染完毕后（render执行完毕后）的动作
        console.log('first enter page')
        this.getList({
            pageIndex: 1,
            pageSize: 10
        })
        // actions.tenant.loadList();
        // actions.multi.getOrderType();//订单类型下拉框
    }

    getList=(pageObj)=>{//获得表单数据
        this.props.form.validateFields((err, values) => {
            this.search(pageObj, err, values);
        });
    }

    search = (pageObj,err,values) => {//查询
        values.pageIndex = pageObj.pageIndex || this.props.pageIndex || 1,
        values.pageSize = pageObj.pageSize || this.props.pageSize || 10,
        actions.tenant.loadList(values);
    }

    reset = () => {//重置
        console.log("reset search condition");
        this.setState({
            tenantStatus: ''
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
        console.log(record.tenant_id);
        actions.routing.push(
            {
                pathname: 'tenantdetail',//租户详情页面url，位于router.jsx
                detailObj: record,//选中记录放到detailObj对象中，传到detail页面
                editFlag: !!editFlag//记录是否可编辑标志，传到detail页面
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
                render(record, text, index) {
                    return index + 1;
                }
            },
            {
                title: "租户名称",
                dataIndex: "tenant_name",
                key: "tenant_name",
                onCellClick: (record) => this.cellClick(record,true)
            },
            {
                title: "公司名称",
                dataIndex: "corp_name",
                key: "corp_name",
            },
            {
                title: "联系人",
                dataIndex: "contact_person",
                key: "contact_person",
            },
            {
                title: "电话",
                dataIndex: "mobile",
                key: "mobile",
            },
            {
                title: "邮箱",
                dataIndex: "email",
                key: "email",
            },
            {
                title: "认证代码",
                dataIndex: "tenant_code",
                key: "tenant_code",
            },
            {
                title: "认证KEY",
                dataIndex: "tenant_key",
                key: "tenant_key",
            },
            {
                title: "认证令牌",
                dataIndex: "token-null",
                key: "token",
            },
            {
                title: "状态",
                dataIndex: "status",
                key: "status",
            },
            {
                title: "更新时间",
                dataIndex: "update_time",
                key: "update_time",
                render(record, text, index) {
                    if(record){
                        return moment(record).format('YYYY-MM-DD HH:mm:ss')
                    }
                }
            },
            {
                title: "更新人",    
                dataIndex: "update_user",
                key: "update_user",
            },
            {
                title: "创建时间",
                dataIndex: "create_time",
                key: "create_time",
                render(record, text, index) {
                    if(record){
                        return moment(record).format('YYYY-MM-DD HH:mm:ss')
                    }
                }
            },
            {
                title: "创建人",
                dataIndex: "create_user",
                key: "create_user",
            }
        ];
        let { form, list, pageSize, pageIndex, totalPages, orderTypes, showLoading } = this.props;
        const { getFieldProps, getFieldError } = form;
        return (
            <div className='order-list'>
                <Header title='租户认证管理' back={true} />

                <SearchPanel form={form} search={(error,values)=>{this.search({},error,values)}} reset={this.reset}>
                    <Row>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>租户名称：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('tenant_name', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>公司名称：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('corp_name', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>联系人：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('contact_person', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>联系人电话：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('mobile', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>认证代码：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('tenant_code', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>状态：</Label>
                                <Radio.RadioGroup
                                    selectedValue={this.state.tenantStatus}
                                    {
                                    ...getFieldProps('status', {
                                        initialValue: '',
                                        onChange(value) {
                                            self.setState({ tenantStatus: value });
                                        },
                                    }
                                    )}
                                >
                                    <Radio value="0" >禁用</Radio>
                                    <Radio value="1" >启用</Radio>
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
