import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import { Loading, Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select, Radio } from "tinper-bee";
import PaginationTable from 'components/PaginationTable';
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
import { Error } from "../../../../utils";


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectData: [],
            interStatus: ''
        }
    }

    componentDidMount() {//页面渲染完毕后（render执行完毕后）的动作
        console.log('first enter page')
        this.getList({
            pageIndex: 1,
            pageSize: 10
        })
    }

    getList=(pageObj)=>{//获得表单数据
        this.props.form.validateFields((err, values) => {
            this.search(pageObj, err, values);
        });
    }

    search = (pageObj,err,values) => {//查询
        values.pageIndex = pageObj.pageIndex || this.props.pageIndex || 1,
        values.pageSize = pageObj.pageSize || this.props.pageSize || 10,
        actions.inter.loadList(values);
    }

    updateStatus = async (statusFlag) => {//启用停用，更新租户状态
        console.log('update status');
        let { selectData } = this.state, paramArray = [];

        if(selectData.length == 0){
            // console.log("没有选中记录");
            Error('没有选中记录');
            return;
        }

        //拼装请求参数
        //[{"interfaceId":"xxx","status":1},{"interfaceId":"xxx","status":1}]
        paramArray = selectData.map(item => {
            let obj = {};
            obj["interfaceId"] = item["interfaceId"];
            obj["status"] = statusFlag ? 1 : 0;
            return obj;
        })

        console.log("paramArray:" + JSON.stringify(paramArray));
        await actions.inter.updateStatus(paramArray);
        this.setState({
            selectData: []
        });

        await actions.inter.loadList();//刷新页面
    }

    reset = () => {//重置
        this.setState({
            interStatus: ''
        })
    }

    tabelSelect = (data) => {//tabel选中数据
        console.log('table select');
        this.setState({
            selectData: data
        })
    }

    cellClick = (record, editFlag) => {//进入详情
        actions.routing.push(
            {
                pathname: 'interdetail',
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
        let pageSize = (value + 1) * 10;
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
                onCellClick: (record) => this.cellClick(record, true)
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
                title: "状态",
                dataIndex: "status",
                key: "status",
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
        ];
        let { form, list, pageSize, pageIndex, totalPages, total, showLoading } = this.props;
        const { getFieldProps, getFieldError } = form;
        return (
            <div className='order-list'>
                <Header title='接口资源管理' back={true} />

                <SearchPanel form={form} search={(error,values)=>{this.search({},error,values)}} reset={this.reset}>
                    <Row>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>资源编码：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('interfaceCode', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>资源名称：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('interfaceName', {
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
                                    selectedValue={this.state.interStatus}
                                    {
                                    ...getFieldProps('status', {
                                        initialValue: '',
                                        onChange(value) {
                                            self.setState({ interStatus: value });
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
                        <Button size='sm' shape="border" onClick={() => { self.updateStatus(true) }}>
                            启用
                        </Button>
                        <Button size='sm' shape="border" onClick={() => { self.updateStatus(false) }}>
                            停用
                        </Button>
                    </div>
                    {/* <div className="scroll-height">
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
                    </div> */}
                    <PaginationTable
                        data={list}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        totalPages={totalPages}
                        total = {total}
                        columns={column}
                        checkMinSize={6}
                        getSelectedDataFunc={this.tabelSelect}
                        onTableSelectedData={this.tabelSelect}
                        onPageSizeSelect={this.dataNumSelect}
                        onPageIndexSelect={this.onPageSelect}
                    />
                </div>
            </div>
        )
    }
}

export default Form.createForm()(List);
