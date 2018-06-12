import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { actions } from "mirrorx";
import { Table, Button, Col, Row, Icon, InputGroup, FormControl, Checkbox, Modal, Panel, PanelGroup, Label, Message, Select,Radio } from "tinper-bee";
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
        actions.user.loadList();
    }
    search = () => {//查询
        this.props.form.validateFields((err, values) => {
            console.log(values);
            actions.user.loadList(values);
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
        actions.user.loadList({
            pageActive: value ,
        })
    }
    dataNumSelect = (value) => {
        let pageSize = (value + 1) * 5;//针对于5条/10条/15条/20条选项
        actions.user.loadList({
            pageSize: pageSize,
            pageActive: 1
        })
    }
    edit=(record)=>{

    }
    delItem=(record)=>{
        
    }
    detail=(record)=>{

    }
    render() {
        const self = this;
        const column = [
            {
                title: "角色编码",
                dataIndex: "userCode",
                key: "userCode",
            },
            {
                title: "角色名称",
                dataIndex: "userName",
                key: "userName",
            },
            {
                title: "角色描述",
                dataIndex: "userDescribe",
                key: "userDescribe",
            },
            {
                title: "操作",
                dataIndex: "e",
                key: "e",
                render(record,text,index){
                    return (
                        <div className='operation-btn'>
                            <Button size='sm' className='edit-btn' onClick={()=>{this.edit(record)}}>编辑</Button>
                            <Button size='sm' className='del-btn' onClick={()=>{this.delItem(record)}}>删除</Button>
                            <Button size='sm' className='detail-btn' onClick={()=>{this.detail(record)}}>查看</Button>
                        </div>
                    )
                }
            },

        ];
        let { form, list, pageSize, pageActive, totalPages,orderTypes } = this.props;
        const { getFieldProps, getFieldError } = form;
        return (
            <div className='user-list'>
                <Header title='角色管理' />
                <div className='search-panel'>
                    <Row>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>角色编码：</Label>
                                <FormControl
                                    {
                                    ...getFieldProps('userCode', {
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
                                    ...getFieldProps('userName', {
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
                                    ...getFieldProps('userDescribe', {
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
