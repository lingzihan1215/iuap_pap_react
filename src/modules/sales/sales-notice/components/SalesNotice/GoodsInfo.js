import React, { Component } from 'react'
import PaginationTable from 'components/PaginationTable'
import { actions } from 'mirrorx';
import { Button, Message } from 'tinper-bee';
import moment from "moment/moment";
import CommonTitle from '../CommonTitle/index';

export default class GoodsInfo extends Component {
    constructor(props){
        super(props);
        let self=this;
        this.state = {
            step: 10,
            tableSelectedData: []
        }
        this.columns = [
            {
                title: "供应商编码",
                dataIndex: "supplierCode",
                key: "supplierCode",
                width: 100,
                render(record, text, index) {
                    return index + 1;
                }
            },
            {
                title: "供应商名称",
                dataIndex: "supplierName",
                key: "supplierName",
                width: 250,
                className:"td-detail",
                onCellClick: (record) => this.cellClick(record,2)
            },
            {
                title: "类型",
                dataIndex: "supplierType",
                key: "supplierType",
                width: 100
            },
            {
                title: "主要产品",
                dataIndex: "mainProducts",
                key: "mainProducts",
                width: 100
            },
            {
                title: "联系人",
                dataIndex: "contacts",
                key: "contacts",
                width: 100
            },
            {
                title: "类别",
                dataIndex: "supplierCategory",
                key: "supplierCategory",
                width: 100
            },
            {
                title: "货号",
                dataIndex: "turnover",
                key: "turnover",
                width: 100
            }, 
            {
                title: "联系电话",
                dataIndex: "phone",
                key: "phone",
                width: 150
            },
            {
                title: "操作",
                dataIndex: "d",
                key: "d",
                width:100,
                // fixed: "right",
                render(text, record, index) {
                    return (
                        <div className='operation-btn'>
                            <i size='sm' className='uf uf-search edit-btn' onClick={() => { self.cellClick(record,2) }}></i>
                            <i size='sm' className='uf uf-pencil edit-btn' onClick={() => { self.cellClick(record,1) }}></i>
                            <i size='sm' className='uf uf-del del-btn' onClick={() => { self.delItem(record, index) }}></i>
                        </div>
                    )
                }
            }
        ]
    }
  
    cellClick = async (record,btnFlag) => {
        await actions.salesNotice.updateState({
            rowData : record,
        });

        let id = "";
        if(record){
            id = record["id"];
        }
        actions.routing.push(
            {
                pathname: 'example-edit',
                search:`?search_id=${id}&btnFlag=${btnFlag}`
            }
        )
    }
    delItem = (record, index) => {
        actions.salesNotice.delItem({
            param: [record],
            index: index
        });
    }
    onTableSelectedData = data => {
        this.setState({
            tableSelectedData: data
        })
    }
    onPageSizeSelect = (index, value) => {
        actions.salesNotice.searchCustomerInfo({
            pageSize: value
        })
    }
    onPageIndexSelect = value => {
        actions.salesNotice.searchCustomerInfo({
            pageIndex: value
        })
    }
    editTable = () => {
        let data = this.state.tableSelectedData
        actions.salesNotice.updateState({selectData: data})
    }
    render(){
        const self = this;
        let { list, showLoading, pageIndex, pageSize, totalPages } = this.props;

        return (
            <div className='common-panel'>
                <CommonTitle 
                    title="产品明细" 
                    type="uf-listsearch"
                    children={ 
                        <div className="head-btn" style={{marginLeft: "10px"}}>
                            <Button className='head-save' onClick={this.editTable}>修改产品明细</Button>
                        </div>
                    } 
                />
                <PaginationTable
                    data={list}
                    showLoading={showLoading}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    columns={this.columns}
                    checkMinSize={6}
                    onTableSelectedData={this.onTableSelectedData}
                    onPageSizeSelect={this.onPageSizeSelect}
                    onPageIndexSelect={this.onPageIndexSelect}
                    scroll={{ x: 1000, y: 300}}
                />
            </div>

        )

    }
}