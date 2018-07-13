import React, { Component } from 'react';
import { actions ,connect } from "mirrorx";
import PaginationTable from 'components/PaginationTable';
import options from "components/RefOption";
import RefWithInput from 'yyuap-ref/dist2/refWithInput';
import Form from 'bee-form';
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

import Select from 'bee-select';
import DatePicker from 'bee-datepicker';
import moment from "moment";
import zhCN from "rc-calendar/lib/locale/zh_CN";
import NoData from 'components/NoData';

import "bee-datepicker/build/DatePicker.css";
import './index.less'

moment.locale('zh-cn');

// console.log(moment("2017-02-13"))
const format = "YYYY-MM-DD";
const Option = Select.Option;

let id = 0;
class ChildTable extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            refKeyArray:[],
            selectData:[],
            column:[
            {
                title: "订单编号",
                dataIndex: "purchase_order_id",
                key: "purchase_order_id",
                width: 150,
                /* render(record, text, index) {
                    return index + 1;
                } */
            },
            {
                title: "订单明细编号",
                dataIndex: "purchase_item_id",
                key: "purchase_item_id",
                width: 150,
                render: (text, record,index) => this.renderColumns(text, record,index, 'purchase_item_id')
            },
            {
                title: "物料编号",
                dataIndex: "material_id",
                key: "material_id",
                width: 150,
                render: (text, record,index) => this.renderColumns(text, record,index, 'material_id')
            },
            {
                title: "订单行号",
                dataIndex: "order_item",
                key: "order_item",
                width: 150,
                render: (text, record,index) => this.renderColumns(text, record,index, 'order_item')
            },
            {
                title: "物料数量",
                dataIndex: "material_qty",
                key: "material_qty",
                width: 150,
                render: (text, record,index) => this.renderColumnsInputNumber(text, record,index, 'material_qty')
            },
            {
                title: "物料金额",
                dataIndex: "material_price",
                key: "material_price",
                width: 150,
                render: (text, record,index) => this.renderColumnsInputNumber(text, record,index, 'material_price')
            },
            {
                title: "物料单价",
                dataIndex: "price_unit",
                key: "price_unit",
                width: 150,
                render: (text, record,index) => this.renderColumnsInputNumber(text, record,index, 'price_unit')
            },
            {
                title: "确认时间",
                dataIndex: "confirm_time",
                key: "confirm_time",
                width: 150,
                render:(text, record,index) => this.renderDatePicker(text, record,index, 'confirm_time')
            },
            {
                title: "确认人员",
                dataIndex: "confirm_user",
                key: "confirm_user",
                width: 100,
                render:(text, record,index) => this.renderRef(text, record,index, 'confirm_user')
            },
            {
                title: "发货状态",
                dataIndex: "delivery_status",
                key: "delivery_status",
                width: 150,
                render:(text, record,index) => this.renderSelect(text, record,index, 'delivery_status')
            },
            {
                title: "发货数量",
                dataIndex: "delivery_qty",
                key: "delivery_qty",
                width: 150,
                render: (text, record,index) => this.renderColumnsInputNumber(text, record,index, 'delivery_qty')
            },
            {
                title: "收货地址",
                dataIndex: "delivery_addr",
                key: "delivery_addr",
                width: 150,
                render: (text, record,index) => this.renderColumns(text, record,index, 'delivery_addr')
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
    renderColumns = (text, record,index, column) =>{
        return (
            <this.EditableCell
                editable={true}
                value={text}
                onChange={value => this.handleChange(value, index, column)}
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

    handleChange = (value, index, column)=>{
        const newData = [...this.props.childList];
        const target = newData.filter((item,newDataIndex) => index === newDataIndex)[0];
        // debugger
        if (target) {
            target[column] = value;
            actions.mastertable.updateState({
                list: newData
            });
        }
    }

    //渲染数字列
    renderColumnsInputNumber = (text, record,index, column) => {
        return (
            <this.EditableCellInputNumber
                editable={true}
                value={text}
                onChange={value => this.handleChangeNumber(value, index, column)}
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

    handleChangeNumber = (value, index, column)=>{
        const newData = [...this.props.childList];
        const target = newData.filter((item,newDataIndex) => index === newDataIndex)[0];
        // debugger
        if (target) {
            target[column] = parseInt(value);
            console.log("newData inputnumber"+newData);
            actions.mastertable.updateState({
                list: newData
            });
        }
    }

    // 渲染时间列
    renderDatePicker = (text, record,index, column) =>{
        return (
            <this.EditableCellDatePicker
                editable={true}
                value={text}
                onChange={value => this.handleChangeDate(value, index, column)}
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

    handleChangeDate = (value, index, column)=> {
        // console.log("date",value.toISOString());
        const newData = [...this.props.childList];
        const target = newData.filter((item,newDataIndex) => index === newDataIndex)[0];
        // debugger
        if (target) {
            target[column] = value.toISOString();
            console.log("newData date",newData)
            actions.mastertable.updateState({
                list: newData
            });
        }
    }

    // 渲染参照
    renderRef = (text, record,index, column) => {
        let self = this;
        return (
            <this.EditableCellRef
                editable={true}
                value={text}
                index={index}
                self = {self}
                fieldKey = {column}
                refKeyArray = {this.state.refKeyArray}
                // onChange={value => this.handleChangeNumber(value, record.id, column)}
            />
        );
    }
    
    EditableCellRef = ({ editable, value ,index,self, fieldKey,refKeyArray}) =>(
        <div>
            {console.log(this.props.form)}
            {
                editable?(
                    <RefWithInput disabled={false} option={Object.assign(JSON.parse(options), {
                        title: '',
                        refType: 5,//1:树形 2.单表 3.树卡型 4.多选 5.default
                        className: '',
                        param: {//url请求参数
                            refCode: 'common_ref',
                            tenantId: '',
                            sysId: '',
                            transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
                        },
                        keyList: refKeyArray,//选中的key
                        onSave: function (sels) {
                            console.log('sels',sels);
                            const showData = sels.map(v => v.peoname)
                            var temp = sels.map(v => v.key)
                            console.log("temp", temp);
                            /* self.setState({
                                refKeyArray: temp,
                            }) */
                            const newData = [...self.props.childList];
                            const target = newData.filter((item,newDataIndex) => index === newDataIndex)[0];
                            if (target) {
                                target[fieldKey] = temp;
                                actions.mastertable.updateState({
                                    list: newData
                                });
                            }
                        },
                        showKey: 'peoname',
                        verification: true,//是否进行校验
                        verKey: fieldKey,//校验字段
                        verVal: value
                    })} form={this.props.form} />
               ) 
               :value
            }
        </div>
        
    )

    // 渲染下拉框
    renderSelect = (text, record,index, column) => {
        return (
            <this.EditableCellSelect
                editable={true}
                value={text}
                onSelect={value => this.handleTableSelect(value, index, column)}
            />
        );
    }

    EditableCellSelect = ({editable,value,onSelect}) =>(
        <div>
            {editable
                ? (
                    <Select
                        defaultValue = '0'
                        onSelect = {value=>onSelect(value)}
                        >
                        <Option value="0">未发货</Option>
                        <Option value="1">已发货</Option>
                    </Select>
                )
                : value
            }
        </div>
    )

    handleTableSelect = (value, index, column)=> {
        const newData = [...this.props.list];
        const target = newData.filter((item,newDataIndex) => index === newDataIndex)[0];
        if (target) {
            target[column] = value;
            actions.mastertable.updateState({
                list: newData
            });
        }
    }

    // 分页选择信息
    handleSelect = ()=>{

    }

    dataNumSelect = ()=>{

    }


    // 增加空行
    onAddEmptyRow = ()=>{
        let tempArray = [...this.props.childList],
            emptyRow = {
                purchase_order_id:"123",
                purchase_item_id:123,
                material_id:'123',
                order_item:'234',
                material_qty:'456',
                material_price:'252',
                price_unit:'773',
                confirm_time:'2017-02-21',
                confirm_user:'abc',
                delivery_status:'1',
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

export default connect( state => state.mastertable, null )(Form.createForm()(ChildTable));