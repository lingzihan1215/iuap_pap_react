import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import { Loading,Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select,Radio } from "tinper-bee";
import Form from 'bee-form';
import Header from "components/Header";
import './edit.less';
const FormItem=Form.FormItem;
class Edit extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }
    save=()=>{
        this.props.form.validateFields((error,values)=>{
            if(error){

            }else{
                console.log(values);
            }
        })
    }

    render (){
        let {form,showLoading} = this.props;
        let {editFlag,editObj}=this.props.location;
        let {roleCode,roleName,roleDescribe}=editObj;
        const { getFieldProps, getFieldError } =form;
        return (
            <div className='role-edit'>
                <Loading
                    showBackDrop={true}
                    loadingType="line"
                    show={showLoading}
                />
                <Header title={editFlag?'角色编辑':'角色详情'} back={true}>
                    {editFlag?(
                        <div className='head-btn'>
                            <Button className='head-cancel'>取消</Button>
                            <Button className='head-save' >保存</Button>
                        </div>
                    ):''}
                </Header>
                <Row className='edit-body'>
                    <Col md={4} xs={6}>
                        <Label>
                            角色编码：
                        </Label>
                        <FormItem><span className='mast'>*</span>
                            <FormControl disabled={!editFlag}
                                    placeholder="请输入角色编码"
                                    {
                                        ...getFieldProps('roleCode', {
                                            initialValue: roleCode,
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: true, message: '请输入角色编码',
                                            }],
                                        }
                                    ) }
                                />
                         <span className='error'>
                            {getFieldError('roleCode')}
                        </span>
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            角色名称：
                        </Label>
                        <FormItem><span className='mast'>*</span>
                        <FormControl disabled={!editFlag}
                                    placeholder="请输入角色名称"
                                    {
                                        ...getFieldProps('roleName', {
                                            initialValue: roleName,
                                            validateTrigger: 'onBlur',
                                            rules: [{
                                                required: true, message: '请输入角色名称',
                                            }],
                                        }
                                    ) }
                                />
                        <span className='error'>
                            {getFieldError('roleName')}
                        </span>
                        </FormItem>
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                            角色描述：
                        </Label>
                        <FormItem>
                            <FormControl disabled={!editFlag}
                                    placeholder="请输入角色描述"
                                    {
                                        ...getFieldProps('roleDescribe', {
                                            initialValue: roleDescribe,
                                        }
                                    ) }
                                />
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.createForm()(Edit);