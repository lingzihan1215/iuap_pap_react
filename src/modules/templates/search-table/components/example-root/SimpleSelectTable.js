import React, { Component } from 'react';
import { Button,Checkbox,Table } from 'tinper-bee';
import moment from "moment/moment";
import multiSelect from "tinper-bee/lib/multiSelect.js";
import Header from 'components/Header';
import ExampleForm from '../example-form';
const MultiSelectTable = multiSelect(Table, Checkbox);

export default class SimpleSelectTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectData:[]
        }
    }
    /**
     * 编辑
     */
    edit = () =>{
        console.log('进入编辑');
    }
    /**
     * tabel选中数据
     * @param {*} data 
     */
    tabelSelect = (data) => {
        this.setState({
            selectData: data
        })
    }
    render(){
        const self=this;
        const { list,showLoading,pageSize, pageIndex, totalPages } = this.props;
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
                width: 100
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
                            <Button size='sm' className='edit-btn' onClick={() => { self.edit(record,true) }}>编辑</Button>
                        </div>
                    )
                }
            }
        ];
        return (
            <div className="example-select-table">
                <Header title='简单多选表格示例' back={true} />
                <ExampleForm { ...this.props }/>
                <div className="table-list">
                    <MultiSelectTable
                        loading={{ show: showLoading, loadingType: "line" }}
                        rowKey={(r, i) => i}
                        columns={column}
                        data={list}
                        multiSelect={{ type: "checkbox" }}
                        getSelectedDataFunc={this.tabelSelect}
                    />
                </div>
            </div>
        )
    }
}