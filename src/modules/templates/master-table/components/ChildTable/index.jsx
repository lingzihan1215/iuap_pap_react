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

const format = "YYYY-MM-DD";
const Option = Select.Option;

let id = 0;
class ChildTable extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectData:[],
            editFlag:true,
            
        };
        let {btnFlag} = this.props;
        this.editFlag = btnFlag ? btnFlag<2 : true;
        // console.log("editFlag",this.editFlag);
        
        this.column = [
            {
                title: "订单编号",
                dataIndex: "purchaseOrderId",
                key: "purchaseOrderId",
                width: 150,
                render: (text, record, index) => this.renderColumns(text, record, index, 'purchaseOrderId',this.editFlag)
            },
            {
                title: "订单明细编号",
                dataIndex: "purchaseItemId",
                key: "purchaseItemId",
                width: 150,
                render: (text, record, index) => this.renderColumns(text, record, index, 'purchaseItemId',this.editFlag)
            },
            {
                title: "物料编号",
                dataIndex: "materialId",
                key: "materialId",
                width: 150,
                render: (text, record, index) => this.renderColumns(text, record, index, 'materialId',this.editFlag)
            },
            {
                title: "订单行号",
                dataIndex: "orderItem",
                key: "orderItem",
                width: 150,
                render: (text, record, index) => this.renderColumns(text, record, index, 'orderItem',this.editFlag)
            },
            {
                title: "物料数量",
                dataIndex: "materialQty",
                key: "materialQty",
                width: 150,
                render: (text, record, index) => this.renderColumnsInputNumber(text, record, index, 'materialQty',this.editFlag)
            },
            {
                title: "物料金额",
                dataIndex: "materialPrice",
                key: "materialPrice",
                width: 150,
                render: (text, record, index) => this.renderColumnsFloat(text, record, index, 'materialPrice',this.editFlag)
            },
            {
                title: "物料单价",
                dataIndex: "priceUnit",
                key: "priceUnit",
                width: 150,
                render: (text, record, index) => this.renderColumnsFloat(text, record, index, 'priceUnit',this.editFlag)
            },
            {
                title: "确认时间",
                dataIndex: "confirmTime",
                key: "confirmTime",
                width: 150,
                render: (text, record, index) => this.renderDatePicker(text, record, index, 'confirmTime',this.editFlag)
            },
            {
                title: "确认人员",
                dataIndex: "confirmUser",
                key: "confirmUser",
                width: 150,
                render: (text, record, index) => this.renderRef(text, record, index, 'confirmUser',this.editFlag)
            },
            {
                title: "发货状态",
                dataIndex: "deliveryStatus",
                key: "deliveryStatus",
                width: 150,
                render: (text, record, index) => this.renderSelect(text, record, index, 'deliveryStatus',this.editFlag)
            },
            {
                title: "发货数量",
                dataIndex: "deliveryQty",
                key: "deliveryQty",
                width: 150,
                render: (text, record, index) => this.renderColumnsInputNumber(text, record, index, 'deliveryQty',this.editFlag)
            },
            {
                title: "收货地址",
                dataIndex: "deliveryAddr",
                key: "deliveryAddr",
                width: 150,
                render: (text, record, index) => this.renderColumns(text, record, index, 'deliveryAddr',this.editFlag)
            },
            {
                title: "操作",
                dataIndex: "d",
                key: "d",
                width: 100,
                render:(text, record, index)=> {
                    return  (
                        
                        <div className='operation-btn'>
                            {
                                this.editFlag?<i size='sm' className='uf uf-del del-btn' onClick={() => { this.onChildDel(record, index) }}></i> :text
                            }
                        </div>
                    ) 
                        
                    
                }
            }]
    }

    // 普通编辑框渲染
    renderColumns = (text, record,index, column,editFlag) =>{
        return (
            <this.EditableCell
                editable={editFlag}
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

    //渲染整型数字列
    renderColumnsInputNumber = (text, record,index, column,editFlag) => {
        return (
            <this.EditableCellInputNumber
                editable={editFlag}
                value={text}
                onChange={value => this.handleChangeNumber(value, index, column)}
            />
        );
    }

     //行编辑InputNumber
    EditableCellInputNumber = ({ editable, value,onChange }) => (
        <div>
            {editable
                ? <InputNumber
                    iconStyle="one"
                    max={9999}
                    min={0}
                    step={ 1}
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
        if (target) {
            target[column] = parseInt(value);
            actions.mastertable.updateState({
                list: newData
            });
        }
    }

    // 渲染浮点类型数字列
    renderColumnsFloat = (text, record,index, column,editFlag) => {
        return (
            <this.EditableCellFloat
                editable={editFlag}
                value={text}
                onChange={value => this.handleChangeFloat(value, index, column)}
            />
        );
    }

     //行编辑InputNumber
     EditableCellFloat = ({ editable, value,onChange }) => (
        <div>
            {editable
                ? <InputNumber
                    precision={2}
                    min={0}
                    step={ 1}
                    value={value}
                    onChange={value => onChange(value)}
                />
                : value
            }
        </div>
    );

    handleChangeFloat = (value, index, column)=>{
        const newData = [...this.props.childList];
        const target = newData.filter((item,newDataIndex) => index === newDataIndex)[0];
        if (target) {
            target[column] = value;
            actions.mastertable.updateState({
                list: newData
            });
        }
    }

    // 渲染时间列
    renderDatePicker = (text, record,index, column,editFlag) =>{
        return (
            <this.EditableCellDatePicker
                editable={editFlag}
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
        if (target) {
            target[column] = value.toISOString();
            // console.log("newData date",newData)
            actions.mastertable.updateState({
                list: newData
            });
        }
    }

    // 渲染参照
    renderRef = (text, record,index, column,editFlag) => {
        let self = this;
        // 处理参照的key值
        let cacheArray = [...this.props.cacheArray];
        let childRefKey =[],
            uuid = record.uuid;
        cacheArray.map((item)=>{
            let temp = item.uuid;
            if(temp && uuid && (temp ==uuid)){
                childRefKey = item[column]? item[column].split(','):[]
            }
        })
        
        return (
            <this.EditableCellRef
                editable={editFlag}
                value={text}
                index={index}
                self = {self}
                fieldKey = {column}
                record = {record}
                childRefKey = {childRefKey}
            />
        );
    }
    
    EditableCellRef = ({ editable, value ,index,self, fieldKey,record,childRefKey}) =>(
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
                            const target = newData.filter((item,newDataIndex) => record.uuid === item.uuid)[0];
                            if (target) {
                                let uuid = target['uuid'];
                                // target[fieldKey+index] = temp.join();
                                target[fieldKey+uuid] = temp.join();
                                actions.mastertable.updateState({
                                    list: newData
                                });
                            }
                        },
                        showKey: 'peoname',
                        verification: true,//是否进行校验
                        // verKey: fieldKey+index,//校验字段
                        verKey: 'abc'+record['uuid'],//校验字段
                        verVal: value
                    })} form={this.props.form} />
               ) 
               :value
            }
        </div>
        
    )

    // 渲染下拉框
    renderSelect = (text, record,index, column,editFlag) => {
        return (
            <this.EditableCellSelect
                editable={editFlag}
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
                        value = {value+""||'0'}
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
            // UUID用于表示新增数据，在保存数据时需要删掉uuid字段
            // let uuid = this.guid();
            let uuid = setTimeout(function(){},1);
            emptyRow['uuid'] = uuid;
            tempArray.push(emptyRow);
            actions.mastertable.updateState({childList:tempArray})
    }

    // 产生uuid备用
    guid = ()=>{
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    // 子表删除
    onChildDel = async (record, index)=>{

        console.log("行删除",record,index);
        let childList = this.deepClone("childList"),
            cacheArray = this.deepClone("cacheArray"),
            id = record['id'],
            uuid = record['uuid'],
            delArray = this.deepClone('delArray');
        
        let childLen = childList.length,
            cacheLen = cacheArray.length;

        if(uuid) {
            let tempIndex = 0;
            for(let i=0;i<childLen;i++) {
                let item = Object.assign([],childList[i]);
                let temp = item.uuid;
                if(temp && temp==uuid){
                    tempIndex = i;
                }
                
            }
            let delItem = childList[tempIndex];
            let delItemId = delItem.id;
            if(delItemId){
                delArray.push(Object.assign({},childList[tempIndex],{dr:1}));
            }
            childList.splice(tempIndex,1);
            console.log("delArray",delArray);
        }
        

        console.log("this.props.childList",this.props.childList);
        console.log("删除后",childList,cacheArray)
        
        await actions.mastertable.updateState({
            childList:childList,
            cacheArray:cacheArray,
            delArray
        })

    }

    deepClone = (param)=>{
        let array = [];
        this.props[param].map(item=>{
            let temp = Object.assign({},item);
            array.push(item);
        })
        return array;
    }

    // 子表分页信息

    tabelSelect = ()=>{

    }

    onTableSelectedData = ()=>{

    }

    onPageSizeSelect = ()=>{

    }

    onPageIndexSelect = ()=>{

    }

    render() {
        let {childList,
            childPageIndex,childPageSize,childTotalPages,
        } = this.props;
        console.log("editFlag",this.editFlag);
        return (
            <div className="child-table">
                <div className="chidtable-operate-btn">
                    <Button disabled={!this.editFlag} size='sm' colors="primary" onClick={this.onAddEmptyRow}>增行</Button>
                </div>
                <Row className='table-list'>
                    <Col md={12}>
                        <Table
                            loading={{ show: this.state.loading, loadingType: "line" }}
                            bordered
                            emptyText={() => <NoData />}
                            data={childList}
                            rowKey={r => r.id}
                            columns={this.column}
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
                        {/* <PaginationTable
                            data={childList}
                            showLoading={false}
                            pageIndex={childPageIndex}
                            pageSize={childPageSize}
                            totalPages={childTotalPages}
                            columns={this.column}
                            checkMinSize={6}
                            getSelectedDataFunc={this.tabelSelect}
                            onTableSelectedData={this.onTableSelectedData}
                            onPageSizeSelect={this.onPageSizeSelect}
                            onPageIndexSelect={this.onPageIndexSelect}
                            scroll={{ x: 1300, y: 520 }}
                        /> */}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect( state => state.mastertable, null )(Form.createForm()(ChildTable));