import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import { Loading,Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select,Radio } from "tinper-bee";
import { BpmTaskApprovalWrap } from 'yyuap-bpm';
import Header from "components/Header";
import DatePicker from 'bee-datepicker';
import Form from 'bee-form';
import './edit.less';
import moment from "moment";

const FormItem = Form.FormItem;

class Edit extends Component {
    constructor(props){
        super(props);
        this.state={
            approvalState:'0',
            closeState:'0',
            confirmState:'0'
        }
    }
    componentWillMount(){
        if(this.props.location.detailObj&&this.props.location.detailObj.id){
            let {approvalState,closeState,confirmState}=this.props.location.detailObj;
            this.setState({
                approvalState:String(approvalState),
                closeState:String(closeState),
                confirmState:String(confirmState)
            })
        }
    }
    save = () => {//保存
        this.props.form.validateFields((err, values) => {
            values.approvalState=Number(values.approvalState);
            values.closeState=Number(values.closeState);
            values.confirmState=Number(values.confirmState);
            values.voucherDate=values.voucherDate!=undefined?values.voucherDate.format('YYYY-MM-DD'):'';
            if(err){
                Message.create({ content: '数据填写错误', color : 'danger'  });
            }else{
                if(this.props.location.detailObj&&this.props.location.detailObj.id){
                    values.id=this.props.location.detailObj.id;
                    values.ts=this.props.location.detailObj.ts;
                }
                actions.searchTable.save(values);
            }
        });
    }
    cancel=()=>{
        window.history.go(-1);
    }
    // 跳转到流程图
    onClickToBPM = ()=>{
        console.log("actions",actions);
        actions.routing.push({
            pathname:'example-chart',
            search:`?id=${this.props.rowData.id}`
        })
    }

    // 动态显示标题
    onChangeHead = (btnFlag)=>{
        let msg = "";
        switch(btnFlag) {
            case 0:
                msg = "新增";
                break;
            case 1:
                msg = "编辑";
                break;
            case 2:
                msg = "详情"
                break;
        }
        return msg;
    }
    render (){
        const self=this;
        let {orderTypes,orderCode,supplier,supplierName,type,purchasing,purchasingGroup,voucherDate,approvalState,confirmState,closeState} = this.props.location.detailObj;
        const editFlag = this.props.location.editFlag;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className='order-detail'>
            <Loading
            showBackDrop={true}
            loadingType="line"
            show={this.props.showLoading}
            />
                <Header title={editFlag?'订单编辑':'订单详情'} back={true}>
                    {editFlag?(
                        <div className='head-btn'>
                            <Button className='head-cancel' onClick={this.cancel}>取消</Button>
                            <Button className='head-save' onClick={this.save}>保存</Button>
                        </div>
                    ):''}
                </Header>
                <Row className='detail-body'>
                    <Col md={4} xs={6}>
                        <Label>
                            订单编号：
                        </Label>
                        <FormControl disabled={true} 
                            placeholder="使用编码规则生成"
                            {
                                ...getFieldProps('orderCode', {
                                    initialValue: orderCode
                                }
                            ) }
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        供应商名称：
                        </Label>
                        <FormControl disabled={!editFlag} 
                            {
                                ...getFieldProps('supplierName', {
                                    initialValue: supplierName
                                }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        类型：
                        </Label>
                        {
                            editFlag?(
                                <Select  
                                {
                                ...getFieldProps('type', {
                                    initialValue: type||'',
                                }
                                )}>
                                <Option value="">请选择</Option>
                                {
                                    self.props.orderTypes.map((item,index)=>{
                                        return (
                                            <Option key={index} value={item.code}>{item.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                            ):(<FormControl disabled={!editFlag} />)
                        }

                        
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            采购组织：
                        </Label>
                        <FormControl disabled={!editFlag} 
                            {
                                ...getFieldProps('purchasing', {
                                    initialValue: purchasing
                                }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            采购组：
                        </Label>
                        <FormControl disabled={!editFlag} 
                            {
                                ...getFieldProps('purchasingGroup', {
                                    initialValue: purchasingGroup
                                }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label className='time'>
                            凭证日期：
                        </Label>
                        <DatePicker className='form-item' disabled={!editFlag} 
                            defaultValue={moment(voucherDate)}
                            format = "YYYY-MM-DD"
                            {
                                ...getFieldProps('voucherDate', {
                                    initialValue: moment(voucherDate)
                                }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            审批状态：
                        </Label>
                        {
                            editFlag?
                            (<Radio.RadioGroup
                                disabled = {true}
                                selectedValue={this.state.approvalState}
                                {
                                    ...getFieldProps('approvalState', {
                                        initialValue: '0',
                                        onChange(value) {
                                            self.setState({ approvalState: value });
                                        },
                                    }
                                    ) }
                                >
                                <Radio value="0" >未审批</Radio>
                                <Radio value="1" >已审批</Radio>
                                </Radio.RadioGroup>):(
                                <FormControl disabled={!editFlag} value={approvalState}/>
                            )
                        }
                        
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            确认状态：
                        </Label>
                        {editFlag?(
                                <Radio.RadioGroup
                                selectedValue={this.state.confirmState}
                                    {
                                        ...getFieldProps('confirmState', {
                                            initialValue: '0',
                                            onChange(value) {
                                                self.setState({ confirmState: value });
                                            },
                                        }
                                        ) }
                                    >
                                   <Radio value="0" >未确认</Radio>
                                    <Radio value="1" >已确认</Radio>
                                    <Radio value="2" >拒绝</Radio>
                                </Radio.RadioGroup>
                        ):(<FormControl disabled={!editFlag} value={confirmState}/>)}
                        
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            关闭状态：
                        </Label>
                        {
                            editFlag?(<Radio.RadioGroup
                                selectedValue={this.state.closeState}
                                    {
                                        ...getFieldProps('closeState', {
                                            initialValue: '0',
                                            onChange(value) {
                                                self.setState({ closeState: value });
                                            },
                                        }
                                        ) }
                                    >
                                    <Radio value="0" >未关闭</Radio>
                                    <Radio value="1" >已关闭</Radio>
                                </Radio.RadioGroup>):(
                                    <FormControl disabled={!editFlag} value={closeState}/>
                                )
                        }
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.createForm()(Edit);