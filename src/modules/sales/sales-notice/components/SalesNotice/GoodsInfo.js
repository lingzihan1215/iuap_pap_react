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
                title: "序号",
                dataIndex: "index",
                key: "index",
                width: 100,
                render(record, text, index) {
                    return index + 1;
                }
            },
            {
                title: "产品",
                dataIndex: "product",
                key: "product",
                width: 100
            },
            {
                title: "收货人",
                dataIndex: "receiver",
                key: "receiver",
                width: 100
            },
            {
                title: "订单编码",
                dataIndex: "orderCode",
                key: "orderCode",
                width: 250,
                className:"td-detail",
                onCellClick: (record) => this.cellClick(record,2)
            },
            {
                title: "订单项次",
                dataIndex: "orderTerms",
                key: "orderTerms",
                width: 100
            },
            {
                title: "尺寸厚度",
                dataIndex: "sizeThickness",
                key: "sizeThickness",
                width: 100
            },
            {
                title: "库存",
                dataIndex: "repertory",
                key: "repertory",
                width: 100
            },
            {
                title: "营业交期",
                dataIndex: "trading_period",
                key: "trading_period",
                width: 100
            },
            {
                title: "备注",
                dataIndex: "livelihoods",
                key: "livelihoods",
                width: 250
            }
        ]
    }
  
    cellClick = async (record,btnFlag) => {
        // await actions.salesNotice.updateState({
        //     rowData : record,
        // });

        // let id = "";
        // if(record){
        //     id = record["id"];
        // }
        // actions.routing.push(
        //     {
        //         pathname: 'example-edit',
        //         search:`?search_id=${id}&btnFlag=${btnFlag}`
        //     }
        // )
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
    editTable = (action) => {
        let data = this.state.tableSelectedData
        let buf = [];

        if( action == "add") {
            actions.salesNotice.updateState({selectData: data})
        } else {
            let cancelData = this.props.list.filter((item, index) => {
                data.forEach(i => {
                    if(i.id != item.id) {
                        buf.push(item)
                    }
                })
            })
            actions.salesNotice.updateState({selectData: buf})
        }
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
                            <Button className='head-save' onClick={() => this.editTable("add")}>添加</Button>
                            <Button onClick={() => this.editTable("cancel")}>取消</Button>
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
                    scroll={{ x: 1200, y: 200}}
                />
            </div>

        )

    }
}