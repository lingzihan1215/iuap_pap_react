import React, { Component } from 'react'
import PaginationTable from 'components/PaginationTable'
import { actions } from 'mirrorx';
import { Button } from 'tinper-bee';
import moment from "moment/moment";
import Header from 'components/Header';
import ExampleForm from '../example-form';

export default class SimplePaginationTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            // 表格中所选中的数据，拿到后可以去进行增删改查
            selectData: [],
            pageIndex: 0,
            step: 10
        }
    }
    componentWillMount(){
        this.setState({ step: this.props.pageSize })
        actions.searchTable.loadList();//table数据
    }
    getCloumns(){
        const column = [
            {
                title: "序号",
                dataIndex: "index",
                key: "index",
                width: 100,
                render(record, text, index) {
                    return index + 1;
                }
            },
            {
                title: "订单编号",
                dataIndex: "orderCode",
                key: "orderCode",
                width: 250,
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
                dataIndex: "d",
                key: "d",
                width:100,
                fixed: "right",
                render(text, record, index) {
                    return (
                        <div className='operation-btn'>
                            <Button size='sm' className='edit-btn' onClick={() => { self.edit(record,true) }}>编辑</Button>
                        </div>
                    )
                }
            }
        ];
        return column;
    }
    onTableSelectedData = data => {
        console.log(data)
        this.setState({
            selectData: data
        })
    }
    onPageSizeSelect = (index, value) => {
        actions.searchTable.loadList({
            pageSize: value
        })
    }
    onPageIndexSelect = value => {
        actions.searchTable.loadList({
            pageIndex: value
        })
    }
    
    render(){
        let { list, showLoading, pageIndex, pageSize, totalPages } = this.props;
        return (
            <div className='example-root'>
                <Header title='简单分页表格示例'/>
                <ExampleForm { ...this.props }/>
                <PaginationTable 
                    data={list}
                    showLoading={false}
                    pageIndex={pageIndex}
                    pageSize={this.state.step}
                    totalPages={totalPages}
                    columns={this.getCloumns()}
                    onTableSelectedData={this.onTableSelectedData}
                    onPageSizeSelect={this.onPageSizeSelect}
                    onPageIndexSelect={this.onPageIndexSelect}
                    scroll={{ x: 1550, y: 200}}
                />
            </div>

        )
        
    }
}