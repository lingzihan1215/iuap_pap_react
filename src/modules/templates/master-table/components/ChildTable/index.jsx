import React, { Component } from 'react';
import { actions ,connect } from "mirrorx";
import queryString from 'query-string';
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
            selectData:[],
            editFlag:true,
            column:[
            {
                title: "订单编号",
                dataIndex: "purchaseOrderId",
                key: "purchaseOrderId",
                width: 150,
                /* render(record, text, index) {
                    return index + 1;
                } */
            },
            {
                title: "订单明细编号",
                dataIndex: "purchaseItemId",
                key: "purchaseItemId",
                width: 150,
                render: (text, record,index) => this.renderColumns(text, record,index, 'purchaseItemId')
            },
            {
                title: "物料编号",
                dataIndex: "materialId",
                key: "materialId",
                width: 150,
                render: (text, record,index) => this.renderColumns(text, record,index, 'materialId')
            },
            {
                title: "订单行号",
                dataIndex: "orderItem",
                key: "orderItem",
                width: 150,
                render: (text, record,index) => this.renderColumns(text, record,index, 'orderItem')
            },
            {
                title: "物料数量",
                dataIndex: "materialQty",
                key: "materialQty",
                width: 150,
                render: (text, record,index) => this.renderColumnsInputNumber(text, record,index, 'materialQty')
            },
            {
                title: "物料金额",
                dataIndex: "materialPrice",
                key: "materialPrice",
                width: 150,
                render: (text, record,index) => this.renderColumnsInputNumber(text, record,index, 'materialPrice')
            },
            {
                title: "物料单价",
                dataIndex: "priceUnit",
                key: "priceUnit",
                width: 150,
                render: (text, record,index) => this.renderColumnsInputNumber(text, record,index, 'priceUnit')
            },
            {
                title: "确认时间",
                dataIndex: "confirmTime",
                key: "confirmTime",
                width: 150,
                render:(text, record,index) => this.renderDatePicker(text, record,index, 'confirmTime')
            },
            {
                title: "确认人员",
                dataIndex: "confirmUser",
                key: "confirmUser",
                width: 150,
                render:(text, record,index) => this.renderRef(text, record,index, 'confirmUser')
            },
            {
                title: "发货状态",
                dataIndex: "deliveryStatus",
                key: "deliveryStatus",
                width: 150,
                render:(text, record,index) => this.renderSelect(text, record,index, 'deliveryStatus')
            },
            {
                title: "发货数量",
                dataIndex: "deliveryQty",
                key: "deliveryQty",
                width: 150,
                render: (text, record,index) => this.renderColumnsInputNumber(text, record,index, 'deliveryQty')
            },
            {
                title: "收货地址",
                dataIndex: "deliveryAddr",
                key: "deliveryAddr",
                width: 150,
                render: (text, record,index) => this.renderColumns(text, record,index, 'deliveryAddr')
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

    componentWillMount(){
        // console.log("this.props",this.props);
        // let editFlag = (btnFlag && btnFlag==2) ? false : true;
    }

    showFlag = (btnFlag) => {
        if(btnFlag && btnFlag==2 ){
            return false;
        }else {
            return true;
        }
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
        // 处理参照的key值
        let cacheArray = [...this.props.cacheArray];
        return (
            <this.EditableCellRef
                editable={true}
                value={text}
                index={index}
                self = {self}
                fieldKey = {column}
                childRefKey = {(cacheArray&&(index<cacheArray.length))?cacheArray[index][column].split(','):[]}
            />
        );
    }
    
    EditableCellRef = ({ editable, value ,index,self, fieldKey,childRefKey}) =>(
        <div>
            {
                editable?(
                    <RefWithInput disabled={false} option={Object.assign(JSON.parse(options), {
                        title: '我的参照组织',
                        refType: 5,//1:树形 2.单表 3.树卡型 4.多选 5.default
                        className: '',
                        param: {//url请求参数
                            refCode: 'common_ref',
                            tenantId: '',
                            sysId: '',
                            transmitParam: 'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',
                        },
                        keyList: childRefKey||[],//选中的key
                        onSave: function (sels) {
                            const showData = sels.map(v => v.peoname)
                            var temp = sels.map(v => v.key)
                            const newData = [...self.props.childList];
                            const target = newData.filter((item,newDataIndex) => index === newDataIndex)[0];
                            if (target) {
                                /* let tempConfirmUserName = target.confirmUserName;
                                if(tempConfirmUserName) {
                                    delete target.confirmUserName;
                                }
                                target[fieldKey] = temp.join(); */
                                target[fieldKey+index] = temp.join();
                                actions.mastertable.updateState({
                                    list: newData
                                });
                            }
                        },
                        showKey: 'peoname',
                        verification: true,//是否进行校验
                        verKey: fieldKey+index,//校验字段
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
                        value = {value}
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
                purchaseOrderId:"",
                purchaseItemId:"",
                materialId:'',
                orderItem:'',
                materialQty:'',
                materialPrice:'',
                priceUnit:'',
                confirmTime:moment().toISOString(),
                confirmUser:'',
                deliveryStatus:'',
                deliveryQty:'',
                deliveryAddr:''
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