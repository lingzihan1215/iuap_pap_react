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
        }
    }

    componentWillMount(){
        if(this.props.location.detailObj&&this.props.location.detailObj.id){
        }
    }
    save = () => {//保存
        this.props.form.validateFields((err, values) => {
            if(err){
                Message.create({ content: '数据填写错误', color : 'danger'  });
            }else{
                if(this.props.location.detailObj&&this.props.location.detailObj.id){
                    values.id=this.props.location.detailObj.id;
                }
                actions.inter.save(values);
            }
        });
    }

    cancel=()=>{
        window.history.go(-1);
    }

    render (){
        const self=this;
        let {interfaceCode,interfaceName,url,pageSize,callFrequency,note} = this.props.location.detailObj;
        const editFlag = this.props.location.editFlag;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className='order-detail'>
            <Loading
            showBackDrop={true}
            loadingType="line"
            show={this.props.showLoading}
            />
                <Header title={editFlag?'接口资源编辑':'接口资源详情'} back={true}>
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
                        资源编码：
                        </Label>
                        <FormControl disabled={!editFlag} 
                            {
                                ...getFieldProps('interfaceCode', {
                                    initialValue: interfaceCode
                                }
                            ) }
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        资源名称：
                        </Label>
                        <FormControl disabled={!editFlag} 
                            {
                                ...getFieldProps('interfaceName', {
                                    initialValue: interfaceName
                                }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        资源地址：
                        </Label>
                        <FormControl disabled={!editFlag} 
                            {
                                ...getFieldProps('url', {
                                    initialValue: url
                                }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        分页大小：
                        </Label>
                        <FormControl disabled={!editFlag} 
                            {
                                ...getFieldProps('pageSize', {
                                    initialValue: pageSize
                                }
                            )}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <Label>
                        调用频率：
                        </Label>
                        <FormControl disabled={!editFlag} 
                            {
                                ...getFieldProps('callFrequency', {
                                    initialValue: callFrequency
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