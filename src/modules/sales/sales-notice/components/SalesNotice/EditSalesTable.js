
import React, { Component } from 'react'
import { actions } from 'mirrorx';
import { Col, Row, FormControl, Label, Select, Radio, Button } from "tinper-bee";
import moment from "moment/moment";
import CommonTitle from '../CommonTitle/index';
import Table from 'bee-table';
import 'bee-table/build/Table.css';

export default class EditSalesTable extends Component {
    constructor(props){
        super(props);
        let self = this;
        this.state = {
            step: 10,
            tableSelectedData: []
        }
        this.columns = [
            {
                title: "订单号码",
                dataIndex: "supplierCode",
                key: "supplierCode",
                width: 100
            },
            {
                title: "主要产品",
                dataIndex: "mainProducts",
                key: "mainProducts",
                width: 100
            },
            {
                title: "货号",
                dataIndex: "turnover",
                key: "turnover",
                width: 100
            }, 
            {
                title: "出货数量",
                dataIndex: "goodsNum",
                key: "goodsNum",
                width: 50,
                render: (text, record) => this.renderColumns(text, record, 'goodsNum')
            },
            {
                title: "调货单号",
                dataIndex: "goodsCode",
                key: "goodsCode",
                width: 100,
                render: (text, record) => this.renderColumns(text, record, 'goodsCode')
            },
            {
                title: "调货项次",
                dataIndex: "goodsIndex",
                key: "goodsIndex",
                width: 100,
                render: (text, record) => this.renderColumns(text, record, 'goodsIndex')
            },
            {
                title: "调货重量(MT)",
                dataIndex: "goodsHeave",
                key: "goodsHeave",
                width: 100,
                render: (text, record) => this.renderColumns(text, record, 'goodsHeave')
            },
            {
                title: "调货确认码",
                dataIndex: "goodsConfirmCode",
                key: "goodsConfirmCode",
                width: 100,
                render: (text, record) => this.renderColumns(text, record, 'goodsConfirmCode')
            }
        ]
    }
    renderColumns = (text, record, column) => {
        return (
            <div className="cel-edit-input">
                <FormControl 
                    value={text} 
                    onChange={value => this.handleChange(value, record.id, column)} 
                />
            </div>
        );
    }
    handleChange = (value, id, column) => {
        console.log(id)
        // const newData = [...this.props.selectData];
        // const target = newData.filter(item => id === item.id)[0];
        // if (target) {
        //     target[column] = value;
        //     actions.delivery.updateState({
        //         list: newData
        //     });
        // }
    }
    onTableSelectedData = data => {
        this.setState({
            tableSelectedData: data
        })
    }
    render(){
        const self = this;
        let { selectData, showLoading } = this.props;

        return (
            <div className='notice-goods-info common-panel'>
                <CommonTitle 
                    title="更新销货单明细信息" 
                    type="uf-listsearch"
                />
                <div className="table-list">
                    <Table
                        bordered
                        loading={{ show: showLoading, loadingType: "line" }}
                        rowKey={(r, i) => i}
                        columns={this.columns}
                        data={selectData}
                        getSelectedDataFunc={this.onTableSelectedData}
                        scroll={{ x: 1000, y: 300}}
                        checkMinSize={6}
                    />
                </div>
            </div>

        )

    }
}

