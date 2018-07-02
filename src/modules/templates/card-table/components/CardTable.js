import React, { Component } from "react";
import { actions } from "mirrorx";
import {Select,Label, Table, Button, Col, Row, FormControl, InputNumber, Popconfirm, Message, Popover, Checkbox, Icon } from "tinper-bee";
import filterColumn from "tinper-bee/lib/filterColumn";
import Pagination from 'bee-pagination';
import NoData from 'components/NoData';
import Form from 'bee-form';
import Header from "components/Header";
import './index.less';
const FormItem = Form.FormItem;
const Option = Select.Option;
const FilterColumnTable = filterColumn(Table, Checkbox, Popover, Icon);

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,//内部使用加载数据loading
        }
    }
    componentDidMount = () => {
        this.loadList();//加载表格数据
        actions.cardTable.getFactory();//加载工厂列表
    }
    /**
     * 加载表格数据
     */
    loadList = async () => {
        this.setState({ loading: true });
        let data = await actions.cardTable.getList();
        this.cacheData = data.map(item => ({ ...item }));
        this.setState({ loading: false });
    }
    /**
     * 行编辑列渲染成FormControl
     */
    EditableCell = ({ editable, value, onChange }) => (
        <div>
            {editable
                ? <FormControl value={value} onChange={value => onChange(value)} />
                : value
            }
        </div>
    );
    /**
     * 行编辑列渲染成InputNumber
     */
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
    /**
     * 渲染列
     */
    renderColumns = (text, record, column) => {
        return (
            <this.EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.id, column)}
            />
        );
    }
    /**
     * 渲染列
     */
    renderColumnsInputNumber = (text, record, column) => {
        return (
            <this.EditableCellInputNumber
                editable={record.editable}
                value={text}
                onChange={value => this.handleChangeNumber(value, record.id, column)}
            />
        );
    }
    /**
     * 修改行指定数据key
     */
    handleChangeNumber = (value, id, column) => {
        const newData = [...this.props.list];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target[column] = parseInt(value);
            actions.cardTable.updateState({
                list: newData
            });
        }
    }
    /**
     * 数据更改更新 list
     */
    handleChange = (value, id, column) => {
        const newData = [...this.props.list];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target[column] = value;
            actions.cardTable.updateState({
                list: newData
            });
        }
    }
    /**
     * 行编辑，根据id判断是新增还是编辑
     */
    edit = (id) => {
        const newData = [...this.props.list];
        const target = newData.filter(item => id === item.id)[0];
        if (target.isNew) {
            delete target.isNew;
            target.editable = true;
            actions.cardTable.updateState({
                list: newData
            });
        } else {
            if (target) {
                target.editable = true;
                actions.cardTable.updateState({
                    list: newData
                });
            }
        }
    }
    /**
     * 保存方法
     */
    save = async (id) => {
        this.setState({ loading: true });
        const newData = [...this.props.list];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            delete target.editable;
            actions.cardTable.updateState({
                list: newData
            });
            this.cacheData = newData.map(item => ({ ...item }));
            let newRow = this.cacheData.filter(item => id === item.id)[0];
            if (newRow.isNew) {
                //判断是否新增还是编辑区别是是否存在id
                delete newRow.isNew;
                delete newRow.id;
            }
            //TO DO : Save Data
            let result = await actions.cardTable.saveList(newRow);
            if (result.data.success) {
                this.setState({ loading: false });
                this.loadList();
            }
        }
    }
    /**
     * 取消方法
     */
    cancel = (id, index) => {
        const newData = [...this.props.list];
        const target = newData.filter(item => id === item.id)[0];
        if (target.isNew) {
            newData.splice(index, 1);
            actions.cardTable.updateState({
                list: newData
            });
        } else {
            if (target) {
                Object.assign(target, this.cacheData.filter(item => id === item.id)[0]);
                delete target.editable;
                actions.cardTable.updateState({
                    list: newData
                });
            }
        }
    }
    /**
     * 删除方法
     */
    remove = async (id) => {
        this.setState({ loading: true });
        console.log('删除ID：', id);
        let result = await actions.cardTable.removeList(id);
        if (result.data.success) {
            this.setState({ loading: false });
            this.loadList();
        }
    }
    /**
     * 分页数据改变回调
     */
    handleSelect = (eventKey) => {
        actions.cardTable.updateState({ pageIndex: eventKey });
        this.loadList();
    }
    /**
     * 分页数据改变回调
     */
    dataNumSelect = (index, value) => {
        actions.cardTable.updateState({ pageSize: value });
    }
    /**
     * 新增回调
     */
    handlerAddClick = () => {
        const newData = [...this.props.list];
        const item = {
            editable: true,
            isNew: true,
            id: this.props.list.length + 1,
            orderCode: "自动生成",
            orderId: "",
            prodbatch: "",
            materialCode: "",
            materialName: "",
            orderNumber: 1,
            receNumber: 1,
            deliveNumber: 1,
            unit: ""
        };
        newData.push(item);
        actions.cardTable.updateState({
            list: newData
        });
    }

    /**
     * 表格+from保存方法
     */
    saveForm = () => {//保存
        this.props.form.validateFields((err, values) => {
            if(err){
                Message.create({ content: '数据填写错误', color : 'danger'  });
            }else{
                actions.cardTable.saveAll(values)
            }
        });
    }
    render() {
        let { list,form,planCode,factory } = this.props;
        const { getFieldProps, getFieldError } = form;
        const columns = [
            {
                title: "物料编码",
                dataIndex: "orderCode",
                key: "orderCode",
                width: "8%"
            },
            {
                title: "物料描述",
                dataIndex: "orderId",
                key: "orderId",
                width: "5%",
                render: (text, record) => this.renderColumns(text, record, 'orderId')
            },
            {
                title: "物料单位",
                dataIndex: "prodbatch",
                key: "prodbatch",
                width: "5%",
                render: (text, record) => this.renderColumns(text, record, 'prodbatch')
            },
            {
                title: "采购品类名称",
                dataIndex: "materialCode",
                key: "materialCode",
                width: "10%",
                render: (text, record) => this.renderColumns(text, record, 'materialCode')
            },
            {
                title: "申请数量",
                dataIndex: "orderNumber",
                key: "orderNumber",
                width: "5%",
                render: (text, record) => this.renderColumnsInputNumber(text, record, 'orderNumber')
            },
            {
                title: "本工厂库存",
                dataIndex: "receNumber",
                key: "receNumber",
                width: "5%",
                render: (text, record) => this.renderColumnsInputNumber(text, record, 'receNumber')
            },
            {
                title: "库存地点",
                dataIndex: "deliveNumber",
                key: "deliveNumber",
                width: "5%",
                render: (text, record) => this.renderColumns(text, record, 'deliveNumber')
            },
            {
                title: "操作",
                dataIndex: "op",
                key: "op",
                width: "10%",
                render: (text, record, index) => {
                    const { editable } = record;
                    return (<span>
                        {editable ? <span>
                            <span className="table-op-span-btn" onClick={() => this.save(record.id)} >保存</span>
                            <span className="table-op-span-btn" onClick={() => this.cancel(record.id, index)} >取消</span>
                        </span>
                            : <span><span className="table-op-span-btn" onClick={() => this.edit(record.id)}>编辑</span>
                                <Popconfirm placement="left" content="是否确认删除?" onClose={() => this.remove(record.id)} >
                                    <Button className="table-op-btn" colors="primary" size="sm">删除</Button>
                                </Popconfirm></span>
                        }
                    </span>)
                }
            }
        ];
        return (
            <div className='plan-apply-wrap'>
                <Header title='计划申请' >
                    <div className='head-btn'>
                            <Button className='head-save' onClick={this.saveForm}>保存</Button>
                        </div>
                </Header>
                <div className='common-form edit-panel clearfix'>
                    <Row >
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>计划单号：</Label>
                                <FormControl className='form-item' disabled
                                    {
                                    ...getFieldProps('planCode', {
                                        initialValue: planCode||'测试单号',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>流程主题：</Label> <span className='mast'>*</span>
                                <FormControl className='form-item' 
                                    {
                                    ...getFieldProps('flow', {
                                        initialValue: '',
                                        validateFirst: true,
                                        validateTrigger: 'onBlur',
                                        rules: [{
                                            required: true, message: '请输入流程主题',
                                        }],
                                    })
                                    }
                                />
                                <span className='error'>
                                    {getFieldError('flow')}
                                </span>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>申请人：</Label>
                                <FormControl className='form-item' 
                                    {
                                    ...getFieldProps('proposer', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>计划类型：</Label>
                                <FormControl className='form-item' 
                                    {
                                    ...getFieldProps('planType', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>联系方式：</Label>
                                <FormControl className='form-item' 
                                    {
                                    ...getFieldProps('phone', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>公司：</Label>
                                <FormControl className='form-item' 
                                    {
                                    ...getFieldProps('company', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>所属部门：</Label>
                                <FormControl className='form-item' 
                                    {
                                    ...getFieldProps('department', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>申请人工号：</Label>
                                <FormControl className='form-item' 
                                    {
                                    ...getFieldProps('cardId', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>工厂：</Label><span className='mast'>*</span>
                                <Select className='form-item' {
                                    ...getFieldProps('transportation', {
                                        initialValue: '',
                                        validateFirst: true,
                                        rules: [{
                                            required: true, message: '请选择工厂',
                                        }],
                                    }
                                    ) }>
                                    <Option value=''>请选择</Option>
                                    {  
                                        factory.map((item,index)=>(
                                            <Option key={index} value={item.code}>{item.name}</Option>
                                        ))
                                    }
                                </Select>
                                <span className='error'>
                                    {getFieldError('transportation')}
                                </span>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>需要审批：</Label><span className='mast'>*</span>
                                <Select className='form-item' {
                                    ...getFieldProps('approveFlag', {
                                        initialValue: '0',
                                        validateFirst: true,
                                        rules: [{
                                            required: true, message: '请选择是否需要审批',
                                        }],
                                    }
                                    ) }>
                                    <Option value='0'>是</Option>
                                    <Option value='1'>否</Option>
                                </Select>
                                <span className='error'>
                                    {getFieldError('approveFlag')}
                                </span>
                            </FormItem>
                        </Col>
                        <Col md={12}  >
                            <FormItem>
                                <Label className='textarea'>备注：</Label>
                                <textarea className='form-item' 
                                    {
                                    ...getFieldProps('remark', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        
                    </Row>
                </div>

                <div className='table-list clearfix'>
                    <Row>
                        <Col md={12}>
                            <Table
                                loading={{ show: this.state.loading, loadingType: "line" }}
                                bordered
                                title={() => <Button size="sm" shape="border" onClick={this.handlerAddClick} colors="primary">添加明细</Button>}
                                emptyText={() => <NoData />}
                                data={list}
                                rowKey={r => r.id}
                                columns={columns}
                                scroll={{ y: 520 }}
                                footer={() => <Pagination
                                    first
                                    last
                                    boundaryLinks
                                    items={this.props.total}
                                    activePage={this.props.pageIndex}
                                    onSelect={this.handleSelect}
                                    onDataNumSelect={this.dataNumSelect}
                                    showJump={true}
                                />}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Form.createForm()(List);
