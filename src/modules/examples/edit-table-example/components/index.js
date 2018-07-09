import React, { Component } from "react";
import { actions } from "mirrorx";
import {Select,Label, Table, Button, Col, Row, FormControl, InputNumber, Message, Checkbox, Icon } from "tinper-bee";
import Pagination from 'bee-pagination';
import NoData from 'components/NoData';
import Form from 'bee-form';
import Header from "components/Header";
import './index.less';

class EditTableExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    componentDidMount = () => {
        actions.editTable2.loadList();//加载表格数据
    }
    
    /**
     * 对表格操作的时候，更新modal中的list
     */
    onChange=(value,index,key)=>{
        let lists=this.props.list.slice();
        lists[index][key]=value;
        actions.editTable2.updateState({
            list:lists
        })
    }

    /**
     * 提交
     */
    commit=()=>{
        //this.props.list 是表格的所有数据，传给后台
        consoel.log(this.props.list);
    }

    render() {
        let { list } = this.props;
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
                title: "订单编号",
                dataIndex: "orderCode",
                key: "orderCode"
            },
            {
                title: "供应商名称",
                dataIndex: "supplierName",
                key: "supplierName",
                render:(text,record,index) =>{
                    return (
                        <div>
                            <FormControl value={text} onChange={text => this.onChange(text,index,'supplierName')} />
                        </div>
                     )
                }
            },
            {
                title: "类型",
                dataIndex: "type_name",
                key: "type_name"
            },
            {
                title: "采购组织",
                dataIndex: "purchasing",
                key: "purchasing"
            },
            {
                title: "采购组",
                dataIndex: "purchasingGroup",
                key: "purchasingGroup"
            },
            {
                title: "审批状态",
                dataIndex: "approvalState_name",
                key: "approvalState_name"
            },
            {
                title: "确认状态",
                dataIndex: "confirmState_name",
                key: "confirmState_name"
            },
            {
                title: "关闭状态",
                dataIndex: "closeState_name",
                key: "closeState_name"
            },
            {
                title: "关闭状态",
                dataIndex: "del",
                key: "del",
                render:(text,record,index)=>{
                    return (
                        <Checkbox defaultChecked={text} onChange={value=>{this.onChange(value,index,'del')}}> 
                        </Checkbox>
                    )
                }
            }
        ];
        return (
            <div className='plan-apply-wrap'>
                <Header title='表格编辑示例2' />
                <div className='file-src'>文件位置：src/modules/examples/edit-table-example</div>
                <div className='table-list'>
                    <Row>
                        <Col md={12}>
                            <Table
                                bordered
                                data={list}
                                rowKey={r => r.id}
                                columns={column}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default EditTableExample;
