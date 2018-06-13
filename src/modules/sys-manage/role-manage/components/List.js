import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import { Loading,Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select,Radio } from "tinper-bee";
import Form from 'bee-form';
import Pagination from 'bee-pagination';
import 'bee-pagination/build/Pagination.css';
import Header from "components/Header";
import './list.less';
const FormItem = Form.FormItem;


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        actions.role.loadList();
    }
    search = () => {//查询
        this.props.form.validateFields((err, values) => {
            console.log(values);
            actions.role.loadList(values);
        });
    }
    reset = () => {
        this.props.form.resetFields();
        this.setState({
            approvalState:'',
            closeState:'',
            confirmState:''
        })
    }
    tabelSelect = (data) => {//tabel选中数据
        this.setState({
            selectData: data
        })
    }

    onPageSelect = (value) => {
        actions.role.loadList({
            pageActive: value ,
        })
    }
    dataNumSelect = (value) => {
        let pageSize = (value + 1) * 5;//针对于5条/10条/15条/20条选项
        actions.role.loadList({
            pageSize: pageSize,
            pageActive: 1
        })
    }
    edit(editFlag,record){
        actions.routing.push({
            pathname:'roleedit',
            editObj:record||{},
            editFlag:editFlag
        })
    }
    delItem=(record)=>{
        
    }
    detail=(record)=>{
        
    }
    toGroupM=(record)=>{
        console.log('角色组管理。。。');
    }
    toGroupP=(record)=>{
        console.log('角色权限管理。。。');
    }
    render() {
        const self = this;
        const column = [
            {
                title: "角色组管理",
                dataIndex: "groupM",
                key: "groupM",
                render(text,record,index){
                    return (
                        <a onClick={()=>{self.toGroupM(record)}}>角色组管理</a>
                    )
                }
            },
            {
                title: "角色权限管理",
                dataIndex: "groupP",
                key: "groupP",
                render(text,record,index){
                    return (
                        <a onClick={()=>{self.toGroupP(record)}}>角色权限管理</a>
                    )
                }
            },
            {
                title: "角色编码",
                dataIndex: "roleCode",
                key: "roleCode",
            },
            {
                title: "角色名称",
                dataIndex: "roleName",
                key: "roleName",
            },
            {
                title: "角色描述",
                dataIndex: "roleDescribe",
                key: "roleDescribe",
            },
            {
                title: "操作",
                dataIndex: "e",
                key: "e",
                render(text,record,index){
                    return (
                        <div className='operation-btn'>
                            <Button size='sm' className='edit-btn' onClick={()=>{self.edit(true,record)}}>编辑</Button>
                            <Button size='sm' className='del-btn' onClick={()=>{self.delItem(record)}}>删除</Button>
                            <Button size='sm' className='detail-btn' onClick={()=>{self.edit(false,record)}}>查看</Button>
                        </div>
                    )
                }
            },

        ];
        let { form, list, pageSize, pageActive, totalPages,orderTypes,showLoading } = this.props;
        const { getFieldProps, getFieldError } = form;
        return (
            <div className='role-list'>
            <Loading
                showBackDrop={true}
                loadingType="line"
                show={showLoading}
            />
                <Header title='角色管理' />
                <div className='search-panel'>
                    <Row>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>角色编码：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('roleCode', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>角色名称：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('roleName', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>角色描述：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('roleDescribe', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        
                        <Col md={12} xs={12} className='btn-group'>
                            <Button size='sm' className='reset-btn' onClick={this.reset}>清空</Button>
                            <Button size='sm' className='submit-btn' onClick={this.search}>查询</Button>
                        </Col>
                    </Row>
                </div>
                <div className='table-list'>
                    <div className='table-header'>
                        <Button size='sm' shape="border">
                           新增
                        </Button>
                    </div>
                    <Table
                        columns={column}
                        data={list}
                    />
                </div>
                <div className='pagination'>
                    <Pagination
                        first
                        last
                        prev
                        next
                        boundaryLinks
                        items={totalPages}
                        activePage={pageActive}
                        onDataNumSelect={this.dataNumSelect}
                        onSelect={this.onPageSelect}
                        showJump={true}
                    />
                </div>

            </div>
        )
    }
}

export default Form.createForm()(List);
