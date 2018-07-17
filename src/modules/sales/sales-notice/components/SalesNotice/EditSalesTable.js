
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
            tableEditedData: []
        }
        this.columns = [
            {
                title: "订单号码",
                dataIndex: "orderCode",
                key: "orderCode",
                width: 100
            },
            {
                title: "主要产品",
                dataIndex: "product",
                key: "product",
                width: 100
            },
            {
                title: "订单项次",
                dataIndex: "orderTerms",
                key: "orderTerms",
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
                    defaultValue={text} 
                    key={record.id}
                    onChange={value => this.handleChange(value, record.id, column)} 
                />
            </div>
        );
    }
    /**
     * 这里的性能开销需要注意
     */
    handleChange = async (value, id, column) => {
        // 已经选中并且带下来的数据
        let curData = [...this.props.selectData];
        // 拿到当前所修改行的数据，并更新所修改的字段
        await curData.forEach(item => {
            if(id === item.id) item[column] = value;
            return item;
        });

        actions.salesNotice.updateState({
            tableEditedData: curData
        });
    }
    onTableSelectedData = data => {
        this.setState({
            tableSelectedData: data
        })
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

