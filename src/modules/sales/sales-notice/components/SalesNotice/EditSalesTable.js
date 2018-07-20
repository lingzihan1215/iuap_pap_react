
import React, { Component } from 'react'
import { actions } from 'mirrorx';
import { Col, Row, FormControl, Label, Select, Radio, Button, InputNumber, Message } from "tinper-bee";
import moment from "moment/moment";
import CommonTitle from '../CommonTitle/index';
import Table from 'bee-table';
import 'bee-table/build/Table.css';

export default class EditSalesTable extends Component {
    constructor(props){
        super(props);
        let self = this;
        this.state = {
            step: 10
        }
        this.columns = [
            {
                title: "订单号码",
                dataIndex: "orderCode",
                key: "orderCode",
                width: 100
            },
            {
                title: "订单项次",
                dataIndex: "orderTerms",
                key: "orderTerms",
                width: 100
            },
            {
                title: "产品",
                dataIndex: "product",
                key: "product",
                width: 100
            }, 
            {
                title: "出货数量",
                dataIndex: "shipments",
                key: "shipments",
                width: 100,
                render: (text, record) => this.renderColumns(text, record, 'shipments')
            },
            {
                title: "订单数量",
                dataIndex: "orderNum",
                key: "orderNum",
                width: 100,
                render: (text, record) => this.renderColumns(text, record, 'orderNum')
            },
            {
                title: "调货单号",
                dataIndex: "singleCode",
                key: "singleCode",
                width: 100,
                render: (text, record) => this.renderColumns(text, record, 'singleCode')
            },
            {
                title: "调货项次",
                dataIndex: "orderAdjustment",
                key: "orderAdjustment",
                width: 100,
                render: (text, record) => this.renderColumns(text, record, 'orderAdjustment')
            },
            {
                title: "备注",
                dataIndex: "orderdetailRemark",
                key: "orderdetailRemark",
                width: 100,
                render: (text, record) => this.renderColumns(text, record, 'orderdetailRemark')
            }
        ]
        
    }
    renderColumns = (text, record, column) => {
        return (
            <div className="cel-edit-input">
                
                <FormControl 
                    defaultValue={text} 
                    key={record.orderCode}
                    onChange={value => this.handleChange(value, record.orderCode, column)} 
                />
                {/*
                <InputNumber
                    iconStyle="one"
                    max={9999}
                    min={0}
                    step={1}
                    value={parseInt(text)}
                    onChange={value => this.handleChange(value, record.orderCode, column)}
                />
                */}
            </div>
        );
    }
    componentWillReceiveProps(nextPorps, props){
        
    }
    /**
     * 这里的性能开销需要注意
     */
    handleChange = async (value, orderCode, column) => {
        if(!/^\d+$/.test(value)) {
            Message.create({ duration: 1, content: '请输入大于0的数字', color: 'warning' });
            return ;
        }

        // 已经选中并且带下来的数据
        let curData = [...this.props.selectData.map(item => {
            let { orderCode,orderTerms ,product,shipments,orderNum,singleCode,orderAdjustment,orderdetailRemark} = item;
            return { orderCode,orderTerms ,product,shipments,orderNum,singleCode,orderAdjustment,orderdetailRemark}
        })];
        let tableEditedData = this.props.tableEditedData;
       
        await curData.forEach((item, index) => {
             // 匹配到当前被修改的行数据
            if(orderCode === item.orderCode) {
                if(tableEditedData.length && tableEditedData[index]) {
                    tableEditedData[index][column] = value
                }else {
                    item[column] = value;
                    tableEditedData.push(item)
                }
            }
        });

        actions.salesNotice.updateState({
            tableEditedData: tableEditedData
        });
    }
    onTableSelectedData = data => {
        // this.setState({
        //     tableSelectedData: data
        // })
    }
    render(){
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

