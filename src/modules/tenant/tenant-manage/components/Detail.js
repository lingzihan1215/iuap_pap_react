import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import { Loading,Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select,Radio } from "tinper-bee";
import Header from "components/Header";
import DatePicker from 'bee-datepicker';
import Form from 'bee-form';
import './detail.less';
import moment from "moment";

const FormItem = Form.FormItem;

class Detail extends Component {
    constructor(props){
        super(props);
        this.state={
            approvalState:'0',
            closeState:'0',
            confirmState:'0'
        }
    }

    componentWillMount(){//render执行之前的动作
        console.log("component will mount")
        if(this.props.location.detailObj&&this.props.location.detailObj.tenant_id){
        }
    }
    
    save = () => {//保存
        console.log("save tenant")
        this.props.form.validateFields((err, values) => {
            if(err){
                Message.create({ content: '数据填写错误', color : 'danger'  });
            }else{
                if(this.props.location.detailObj&&this.props.location.detailObj.tenant_id){
                    values.tenant_id=this.props.location.detailObj.tenant_id;
                }
                actions.tenant.save(values);
            }
        });
    }

    cancel=()=>{
        // window.history.go(-1);//返回+刷新
        window.history.back();//返回不刷新
    }

    render (){
        const self=this;
        
        //获取从list页面传来的记录字段值
        let {tenant_id,tenant_name,corp_name,contact_person,mobile,
            email,tenant_code,tenant_key,note} = this.props.location.detailObj;
        const editFlag = this.props.location.editFlag;

        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className='order-detail'>
            <Loading
            showBackDrop={true}
            loadingType="line"
            show={this.props.showLoading}
            />
                <Header title={tenant_id?'租户编辑':'租户新增'} back={true}>
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
                        租户名称：
                        </Label>
                        <FormControl disabled={!editFlag} 
                            {
                                ...getFieldProps('tenant_name', {
                                    initialValue: tenant_name
                                }
                            ) }
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        公司名称：
                        </Label>
                        <FormControl disabled={!editFlag} 
                            {
                                ...getFieldProps('corp_name', {
                                    initialValue: corp_name
                                }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        联系人：
                        </Label>
                        <FormControl disabled={!editFlag} 
                            {
                                ...getFieldProps('contact_person', {
                                    initialValue: contact_person
                                }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        电话：
                        </Label>
                        <FormControl disabled={!editFlag} 
                            {
                                ...getFieldProps('mobile', {
                                    initialValue: mobile
                                }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        邮箱：
                        </Label>
                        <FormControl disabled={!editFlag} 
                            {
                                ...getFieldProps('email', {
                                    initialValue: email
                                }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        认证代码：
                        </Label>
                        <FormControl disabled={!editFlag} 
                            {
                                ...getFieldProps('tenant_code', {
                                    initialValue: tenant_code
                                }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        认证KEY：
                        </Label>
                        <FormControl disabled={!editFlag} 
                            {
                                ...getFieldProps('tenant_key', {
                                    initialValue: tenant_key
                                }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        备注：
                        </Label>
                        <FormControl disabled={!editFlag} 
                            {
                                ...getFieldProps('note', {
                                    initialValue: note
                                }
                            )}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.createForm()(Detail);