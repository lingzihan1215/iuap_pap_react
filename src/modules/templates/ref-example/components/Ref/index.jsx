import React, { Component } from 'react';
import { actions } from "mirrorx";
import { Label,FormControl,Icon,Button,Table,Checkbox } from 'tinper-bee';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from 'components/Header';
import multiSelect from "tinper-bee/lib/multiSelect.js";
const MultiSelectTable = multiSelect(Table, Checkbox);

import './index.less'

class Ref extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showLoading:false
        };
    }

    onAdd = ()=> {

    }

    tabelSelect = (data)=>{
        console.log(data);
    }
    render() {
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
                title: "订单编号",
                dataIndex: "orderCode",
                key: "orderCode",
                width: 200,
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
                width: 300
            }
            
        ];
        let {showLoading } = this.state;
        return (
            <div className="ref-page">
                <Header title='参照示例'/>
                <div>
                    <Button className="editable-add-btn" colors="primary" onClick={this.onAdd} style={{ marginLeft: "5px" }} >新增</Button>
                    <div className="mt10 b-shadow">
                        {/* <Scrollbars> */}
                            <MultiSelectTable
                                scroll = {{x:1250,y:500}}
                                loading={{ show: showLoading, loadingType: "line" }}
                                rowKey={(r, i) => i}
                                columns={column}
                                data={[]}
                                multiSelect={{ type: "checkbox" }}
                                getSelectedDataFunc={this.tabelSelect}
                            />
                        {/* </Scrollbars> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Ref;