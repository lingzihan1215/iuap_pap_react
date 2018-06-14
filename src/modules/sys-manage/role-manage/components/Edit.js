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
            if(!error){
                if(this.props.location.editObj&&this.props.location.editObj.id){
                    values.id=this.props.location.editObj.id;
                }
                actions.role.saveRole(values);
            }
        })
    }
    cancel=()=>{
        window.history.go(-1);
    }
    render (){
        let {form,showLoading} = this.props;
        let {editFlag,editObj}=this.props.location;
        let {roleCode,roleName,roleDescribe,id}=editObj;
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
                            <Button className='head-save' onClick={this.save}>保存</Button>
                        </div>
                    ):''}
                </Header>
                <Row className='edit-body'>

                    <Col lg={1} md={2} sm={3} xs={6}>
                        <Label>
                            角色编码：
                        </Label>
                    </Col>
                    <Col lg={11} md={10} sm={9} xs={6}>
                        <FormItem>
                        <FormControl disabled={true}
                                    placeholder="使用编码规则生成"
                                    {
                                        ...getFieldProps('roleCode', {
                                            initialValue: roleCode
                                        }
                                    ) }
                                />
                        <span className='error'>
                            {getFieldError('roleCode')}
                        </span>
                        </FormItem>
                    </Col>
                    <Col lg={1} md={2} sm={3} xs={6}>
                        <Label>
                        角色名称：
                        </Label>
                    </Col>
                    <Col lg={11} md={10} sm={9} xs={6}>
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
                    <Col lg={1} md={2} sm={3} xs={6}>
                        <Label>
                        角色描述：
                        </Label>
                    </Col>
                    <Col lg={11} md={10} sm={9} xs={6}>
                        <FormItem>
                        <FormItem>
                            <textarea disabled={!editFlag}
                                    placeholder="请输入角色描述"
                                    {
                                        ...getFieldProps('roleDescribe', {
                                            initialValue: roleDescribe,
                                        }
                                    ) }
                                />
                        </FormItem>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.createForm()(Edit);