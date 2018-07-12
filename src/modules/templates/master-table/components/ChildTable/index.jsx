import React, { Component } from 'react';
import { actions ,connect } from "mirrorx";
import PaginationTable from 'components/PaginationTable';
import { 
    InputNumber, InputGroup,FormControl, 
    Loading, 
    Table, 
    Button, 
    Row,Col, 
    Icon, 
    Checkbox, Modal, 
    Panel, PanelGroup, 
    Label, 
    Message, 
    Radio,
    Pagination
} from "tinper-bee";

import DatePicker from 'bee-datepicker';
import moment from "moment";
import zhCN from "rc-calendar/lib/locale/zh_CN";
import NoData from 'components/NoData';

import "bee-datepicker/build/DatePicker.css";
import './index.less'

moment.locale('zh-cn');

// console.log(moment("2017-02-13"))
const format = "YYYY-MM-DD";
let id = 0;
class ChildTable extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectData:[],
            column:[{
                title: "行编号",
                dataIndex: "id",
                key: "id",
                width: 100,
                
            },
            {
                title: "订单编号",
                dataIndex: "purchase_order_id",
                key: "purchase_order_id",
                width: 100,
                render(record, text, index) {
                    return index + 1;
                }
            },
            {
                title: "订单明细编号",
                dataIndex: "purchase_item_id",
                key: "purchase_item_id",
                width: 100,
                render: (text, record) => this.renderColumns(text, record, 'purchase_item_id')
            },
            {
                title: "物料编号",
                dataIndex: "material_id",
                key: "material_id",
                width: 100,
                render: (text, record) => this.renderColumns(text, record, 'material_id')
            },
            {
                title: "订单行号",
                dataIndex: "order_item",
                key: "order_item",
                width: 100,
                render: (text, record) => this.renderColumns(text, record, 'order_item')
            },
            {
                title: "物料数量",
                dataIndex: "material_qty",
                key: "material_qty",
                width: 150,
                render: (text, record) => this.renderColumnsInputNumber(text, record, 'material_qty')
            },
            {
                title: "物料金额",
                dataIndex: "material_price",
                key: "material_price",
                width: 150,
                render: (text, record) => this.renderColumnsInputNumber(text, record, 'material_price')
            },
            {
                title: "物料单价",
                dataIndex: "price_unit",
                key: "price_unit",
                width: 150,
                render: (text, record) => this.renderColumnsInputNumber(text, record, 'price_unit')
            },
            {
                title: "确认时间",
                dataIndex: "confirm_time",
                key: "confirm_time",
                width: 200,
                render:(text, record) => this.renderDatePicker(text, record, 'confirm_time')
            },
            {
                title: "确认人员",
                dataIndex: "confirm_user",
                key: "confirm_user",
                width: 100,
                // render:(text, record) => this.renderRef(text, record, 'confirm_user')
            },
            {
                title: "发货状态",
                dataIndex: "delivery_status",
                key: "delivery_status",
                width: 100,
            },
            {
                title: "发货数量",
                dataIndex: "delivery_qty",
                key: "delivery_qty",
                width: 100,
            },
            {
                title: "收货地址",
                dataIndex: "delivery_addr",
                key: "delivery_addr",
                width: 100,
            },
            {
                title: "操作",
                dataIndex: "d",
                key: "d",
                width: 100,
                // fixed: "right",
                render(text, record, index) {
                    return (
                        <div className='operation-btn'>
                            {/* <i size='sm' className='uf uf-search edit-btn' onClick={() => { self.cellClick(record, 2) }}></i> */}
                            {/* <i size='sm' className='uf uf-pencil edit-btn' onClick={() => { self.cellClick(record, 1) }}></i> */}
                            <i size='sm' className='uf uf-del del-btn' onClick={() => { self.delItem(record, index) }}></i>
                        </div>
                    )
                }
            }]
        };
    }

    // 普通编辑框渲染
    renderColumns = (text, record, column) =>{
        return (
            <this.EditableCell
                editable={true}
                value={text}
                onChange={value => this.handleChange(value, record.id, column)}
            />
        );
    }

    EditableCell = ({editable,value,onChange}) =>(
        <div>
            {editable
                ? <FormControl value={value} onChange={value => onChange(value)} />
                : value
            }
        </div>
    )

    handleChange = (value, id, column)=>{
        const newData = [this.props.childList];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target[column] = parseInt(value);
            actions.mastertable.updateState({
                list: newData
            });
        }
    }

    //渲染数字列
    renderColumnsInputNumber = (text, record, column) => {
        return (
            <this.EditableCellInputNumber
                editable={true}
                value={text}
                onChange={value => this.handleChangeNumber(value, record.id, column)}
            />
        );
    }

     //行编辑InputNumber
    EditableCellInputNumber = ({ editable, value, onChange }) => (
        <div>
            {editable
                ? <InputNumber
                    iconStyle="one"
                    max={9999}
                    min={0}
                    step={1}
                    value={parseInt(value)}
                    onChange={value => onChange(value)}
                />
                : value
            }
        </div>
    );

    handleChangeNumber = (value, id, column)=>{
        const newData = [this.props.childList];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target[column] = parseInt(value);
            actions.mastertable.updateState({
                list: newData
            });
        }
    }

    // 渲染时间列
    renderDatePicker = (text, record, column) =>{
        return (
            <this.EditableCellDatePicker
                editable={true}
                value={text}
                onChange={value => this.handleChangeDate(value, record.id, column)}
            />
        )
    }

    EditableCellDatePicker = ({ editable, value, onChange }) => (
        <div>
            {
                editable?(
                    <DatePicker
                        format={format}
                        locale={zhCN}
                        // onSelect={this.onSelect}
                        defaultValue={moment()}
                        onChange={value => onChange(value)}
                        value={moment(value)}
                    />
               ) 
               :value
            }
        </div>
    )

    handleChangeDate = (value, record, column)=> {
        console.log("date",value.toISOString());
        const newData = [...this.props.list];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target[column] = value.toISOString();
            actions.mastertable.updateState({
                list: newData
            });
        }
    }

    handleSelect = ()=>{

    }

    dataNumSelect = ()=>{

    }


    // 增加空行
    onAddEmptyRow = ()=>{
        let tempArray = [...this.props.childList],
            emptyRow = {
                id:id++,
                purchase_order_id:"123",
                purchase_item_id:123,
                material_id:'123',
                order_item:'234',
                material_qty:456,
                material_price:252,
                price_unit:'773',
                confirm_time:'2017-02-21',
                confirm_user:'abc',
                delivery_status:'已发货',
                delivery_qty:'234',
                delivery_addr:'用友'
            };
            tempArray.push(emptyRow);
            console.log("tempArray",tempArray);
            actions.mastertable.updateState({childList:tempArray})
    }

    render() {
        let {childList,
            childPageIndex,childPageSize,childTotalPages
        } = this.props;
        console.log('render',childList)
        let {column} = this.state;
        return (
            <div className="child-table">
                <div className="chidtable-operate-btn">
                    <Button size='sm' colors="primary" onClick={this.onAddEmptyRow}>增行</Button>
                </div>
                {/* <PaginationTable
                    data={childList}
                    pageIndex={childPageIndex}
                    pageSize={childPageSize}
                    totalPages={childTotalPages}
                    columns={column}
                    checkMinSize={6}
                    getSelectedDataFunc={this.tabelSelect}
                    onTableSelectedData={this.onTableSelectedData}
                    onPageSizeSelect={this.onPageSizeSelect}
                    onPageIndexSelect={this.onPageIndexSelect}
                    scroll={{ x: 1300, y: 500 }}
                /> */}
                <Row className='table-list'>
                    <Col md={12}>
                        <Table
                            loading={{ show: this.state.loading, loadingType: "line" }}
                            bordered
                            emptyText={() => <NoData />}
                            data={childList}
                            rowKey={r => r.id}
                            columns={column}
                            scroll={{ x: 1300, y: 520 }}
                            footer={() => <Pagination
                                first
                                last
                                boundaryLinks
                                items={childTotalPages}
                                activePage={childPageIndex}
                                onSelect={this.handleSelect}
                                // onDataNumSelect={this.dataNumSelect}
                                // showJump={true}
                                dataNum={1}
                            />}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect( state => state.mastertable, null ) (ChildTable);