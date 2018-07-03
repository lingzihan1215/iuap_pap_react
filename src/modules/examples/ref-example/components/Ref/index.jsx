import React, { Component } from 'react';
import { actions } from "mirrorx";
import { Label,FormControl,Icon,Button,Table,Checkbox,Row,Col } from 'tinper-bee';
import { Scrollbars } from 'react-custom-scrollbars';
import Header from 'components/Header';
import multiSelect from "tinper-bee/lib/multiSelect.js";
import createModal from 'yyuap-ref';
import moment from "moment";
import Form from 'bee-form';

import './index.less'

const MultiSelectTable = multiSelect(Table, Checkbox);
const FormItem = Form.FormItem;


class Ref extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showLoading:false
        };
    }

    onRefClick = (inputid,propForm)=> {
        return ()=>{
            console.log("inputid",inputid);
            let refType;
            if(inputid=="searchref"){
                // 带搜索框的列表
                refType = 6
            }else {
                // 穿梭框
                refType = 5;
            }
            let option = {
                refType:refType,//5 穿梭框; 6 多过滤项
                className:'',
                param:{//url请求参数
                    refCode:'common_ref',
                    tenantId:'',
                    sysId:'',
                    transmitParam:'EXAMPLE_CONTACTS,EXAMPLE_ORGANIZATION',//传后台表名
                },
                refModelUrl:{
                    TableBodyUrl:'/newref/rest/iref_ctr/blobRefTreeGrid',//表体请求
                    TableBarUrl:'/newref/rest/iref_ctr/refInfo',//表头请求
                },
                checkedArray: [],
                onSave: function (sels) {
                  console.log(sels);
                },
                filterKey:[
                    {title:'人员名称',key:'peoname'},
                    {title:'人员编码',key:'peocode'},
                ],//传过滤的字段和字段值
                
            }

            createModal(option);
        }
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
        const { getFieldProps, getFieldError,getFieldDecorator} = this.props.form;
        return (
            <div className="ref-page">
                <Header title='参照示例'/>
                <div>
                    {/* <Button className="editable-add-btn" colors="primary" onClick={this.onAdd} style={{ marginLeft: "5px" }} >新增</Button> */}
                    <div className="mt10">
                        
                        <Row>
                            <Col md={4} xs={6} className="mt10">
                                <FormItem>
                                    <Label>搜索参照:</Label>
                                    <FormControl className='form-item'
                                        {
                                        ...getFieldProps('searchref', {
                                            initialValue: '',
                                        })
                                        }
                                    />
                                    <Icon type="uf-navmenu" key={"icon"} className="reficon_adjust" onClick={this.onRefClick("searchref",this.props.form)}></Icon>
                                </FormItem>
                            </Col>

                            <Col md={4} xs={6} className="mt10">
                                <FormItem>
                                    <Label>穿梭框:</Label>
                                    <FormControl className='form-item'
                                        {
                                        ...getFieldProps('shuttlebox', {
                                            initialValue: '',
                                        })
                                        }
                                    />
                                    <Icon type="uf-navmenu" key={"icon"} className="reficon_adjust" onClick={this.onRefClick("shuttlebox",this.props.form)}></Icon>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.createForm()(Ref);