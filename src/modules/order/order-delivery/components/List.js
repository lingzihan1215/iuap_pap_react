import React, { Component } from "react";
import { actions } from "mirrorx";
import {
    Table,
    Button,
    Col,
    Row,
    FormControl,
    InputNumber,
    Popconfirm,
    Message,
    Popover,
    Checkbox,
    Icon,
    Label,
    Select,
    Tooltip
} from "tinper-bee";
import Pagination from 'bee-pagination';
import NoData from 'components/NoData';
import Form from 'bee-form';
import moment from 'moment';
import Hotkeys from 'react-hot-keys';
import DatePicker from 'bee-datepicker';
import Header from "components/Header";
import './list.less';
const Option = Select.Option;
const FormItem = Form.FormItem;


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
        //表格列
        this.columns = [
            {
                title: "订单号",
                dataIndex: "orderCode",
                key: "orderCode",
                width: "8%"
            },
            {
                title: "序号",
                dataIndex: "orderId",
                key: "orderId",
                width: "5%",
                render: (text, record) => this.renderColumns(text, record, 'orderId')
            },
            {
                title: "生产批次",
                dataIndex: "prodbatch",
                key: "prodbatch",
                width: "5%",
                render: (text, record) => this.renderColumns(text, record, 'prodbatch')
            },
            {
                title: "物料编码",
                dataIndex: "materialCode",
                key: "materialCode",
                width: "10%",
                render: (text, record) => this.renderColumns(text, record, 'materialCode')
            },
            {
                title: "物料名称",
                dataIndex: "materialName",
                key: "materialName",
                width: "12%",
                render: (text, record) => this.renderColumns(text, record, 'materialName')
            },
            {
                title: "订单数量",
                dataIndex: "orderNumber",
                key: "orderNumber",
                width: 70,
                render: (text, record) => this.renderColumnsInputNumber(text, record, 'orderNumber')
            },
            {
                title: "已收数量",
                dataIndex: "receNumber",
                key: "receNumber",
                width: 70,
                render: (text, record) => this.renderColumnsInputNumber(text, record, 'receNumber')
            },
            {
                title: "发货数量",
                dataIndex: "deliveNumber",
                key: "deliveNumber",
                width: 70,
                render: (text, record) => this.renderColumnsInputNumber(text, record, 'deliveNumber')
            },
            {
                title: "单位",
                dataIndex: "unit",
                key: "unit",
                width: "5%",
                render: (text, record) => this.renderColumns(text, record, 'unit')
            },
            {
                title: "操作",
                dataIndex: "op",
                key: "op",
                width: "3%",
                render: (text, record, index) => {
                    return (<span>
                        <Popconfirm placement="left" content="是否确认删除?" onClose={() => this.remove(record.id, index)} >
                            <Button className="table-op-btn" colors="primary" size="sm">删除</Button>
                        </Popconfirm>
                    </span>)
                }
            }
        ];
    }
    componentDidMount = () => {
        this.loadList();//加载表格
    }
    onKeyUp(keyName, e, handle) {

    }
    onKeyDown(keyName, e, handle) {

    }
    //加载表格
    loadList = async () => {
        this.setState({ loading: true });
        let data = await actions.delivery.getList();
        this.cacheData = data.map(item => ({ ...item }));
        this.setState({ loading: false });
    }
    //行编辑列Input
    EditableCell = ({ editable, value, onChange }) => (
        <div>
            {editable
                ? <FormControl value={value} onChange={value => onChange(value)} />
                : value
            }
        </div>
    );
    //行编辑InputNumber
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
    //渲染列
    renderColumns = (text, record, column) => {
        return (
            <this.EditableCell
                editable={true}
                value={text}
                onChange={value => this.handleChange(value, record.id, column)}
            />
        );
    }
    //渲染列
    renderColumnsInputNumber = (text, record, column) => {
        return (
            <this.EditableCellInputNumber
                editable={true}
                value={text}
                onChange={value => this.handleChangeNumber(value, record.id, column)}
            />
        );
    }
    //修改行指定数据key
    handleChangeNumber = (value, id, column) => {
        const newData = [...this.props.list];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target[column] = parseInt(value);
            actions.delivery.updateState({
                list: newData
            });
        }
    }
    handleChange = (value, id, column) => {
        const newData = [...this.props.list];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target[column] = value;
            actions.delivery.updateState({
                list: newData
            });
        }
    }

    edit = (id) => {
        const newData = [...this.props.list];
        const target = newData.filter(item => id === item.id)[0];
        if (target.isNew) {
            delete target.isNew;
            target.editable = true;
            actions.delivery.updateState({
                list: newData
            });
        } else {
            if (target) {
                target.editable = true;
                actions.delivery.updateState({
                    list: newData
                });
            }
        }
    }
    handlerSaveAll = async () => {
        const newData = [...this.props.list];
        let newParam = [];
        this.cacheData = newData.map(item => ({ ...item }));
        this.cacheData.map((item) => {
            if (typeof item.id == 'number') {
                delete item.id;
            }
            newParam.push(item);
        });
        console.log(newParam);
        let result = await actions.delivery.saveList({
            table: newParam
        });
        if (result.data.success) {
            this.setState({ loading: false });
            this.loadList();
        }
    }
    save = async (id) => {
        this.setState({ loading: true });
        const newData = [...this.props.list];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            delete target.editable;
            actions.delivery.updateState({
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
            let result = await actions.delivery.saveList(newRow);
            if (result.data.success) {
                this.setState({ loading: false });
                this.loadList();
            }
        }
    }
    cancel = (id, index) => {
        const newData = [...this.props.list];
        const target = newData.filter(item => id === item.id)[0];
        if (target.isNew) {
            newData.splice(index, 1);
            actions.delivery.updateState({
                list: newData
            });
        } else {
            if (target) {
                Object.assign(target, this.cacheData.filter(item => id === item.id)[0]);
                delete target.editable;
                actions.delivery.updateState({
                    list: newData
                });
            }
        }
    }
    remove = async (id, index) => {
        console.log('删除ID：', id);

        if (typeof id == 'number') {
            const newData = [...this.props.list];
            const target = newData.filter(item => id === item.id)[0];
            newData.splice(index, 1);
            actions.delivery.updateState({
                list: newData
            });
        } else {
            this.setState({ loading: true });
            let result = await actions.delivery.removeList(id);
            if (result.data.success) {
                this.setState({ loading: false });
                this.loadList();
            }
        }
    }
    handleSelect = (eventKey) => {
        actions.delivery.updateState({ pageIndex: eventKey });
        this.loadList();
    }

    dataNumSelect = (index, value) => {
        actions.delivery.updateState({ pageSize: value });
        this.loadList();
    }
    handlerAddClick = () => {
        const newData = [...this.props.list];
        const item = {
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
        actions.delivery.updateState({
            list: newData
        });
    }

    saveForm = () => {//保存
        this.props.form.validateFields(async (err, values) => {
            if (err) {
                // Message.create({ content: '数据填写错误', color: 'danger' });
            } else {
                this.setState({ loading: true });
                const newData = [...this.props.list];
                let newParam = [];
                this.cacheData = newData.map(item => ({ ...item }));
                this.cacheData.map((item) => {
                    if (typeof item.id == 'number') {
                        delete item.id;
                    }
                    newParam.push(item);
                });
                console.log(newParam);
                let result = await actions.delivery.saveAllList({
                    table: newParam,
                    form: [values]
                });
                if (result.data.success) {
                    this.setState({ loading: false });
                    this.loadList();
                    Message.create({ content: '保存成功', color: 'success' });
                }
            }
        });
    }
    render() {
        let { list, deliveryCode, form } = this.props;
        const { getFieldProps, getFieldError } = form;
        return (
            <div className='order-delivery-wrap'>
                <Header title='创建送货单' back={true} >
                    <div className='head-btn'>
                        <Button className='head-save' onClick={this.saveForm}>保存</Button>
                    </div>
                </Header>
                <div className='edit-panel'>
                    <Row className='edit-body'>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>送货单号：</Label>
                                <FormControl className='form-item' disabled
                                    {
                                    ...getFieldProps('deliveryCode', {
                                        initialValue: deliveryCode || '测试单号',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label className='time'>凭证日期：</Label>
                                <DatePicker className='form-item' format={'YYYY-MM-DD'}
                                    {
                                    ...getFieldProps('voucherDate', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label className='time'>送货日期：</Label>
                                <DatePicker className='form-item' format={'YYYY-MM-DD'}
                                    {
                                    ...getFieldProps('deliveryDate ', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label className='time'>到达日期：</Label>
                                <DatePicker className='form-item' format={'YYYY-MM-DD'}
                                    {
                                    ...getFieldProps('arrivalDate', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>运输公司：</Label><span className='mast'>*</span>
                                <FormControl className='form-item'
                                    {
                                    ...getFieldProps('transportCompany', {
                                        initialValue: '',
                                        validateTrigger: 'onBlur',
                                        rules: [{
                                            required: true, message: '请输入运输公司',
                                        }],
                                    })
                                    }
                                />
                                <span className='error'>
                                    {getFieldError('transportCompany')}
                                </span>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>运发件数：</Label><span className='mast'>*</span>
                                <FormControl className='form-item' type='number'
                                    {
                                    ...getFieldProps('transportNumber', {
                                        initialValue: '',
                                        validateTrigger: 'onBlur',
                                        rules: [{
                                            required: true, message: '请输入运发件数',
                                        }],
                                    })
                                    }
                                />
                                <span className='error'>
                                    {getFieldError('transportNumber')}
                                </span>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>送货员：</Label><span className='mast'>*</span>
                                <FormControl className='form-item'
                                    {
                                    ...getFieldProps('deliveryman', {
                                        initialValue: '',
                                        validateFirst: true,
                                        validateTrigger: 'onBlur',
                                        rules: [{
                                            required: true, message: '请输入送货员',
                                        }],
                                    })
                                    }
                                />
                                <span className='error'>
                                    {getFieldError('deliveryman')}
                                </span>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>联系电话：</Label><span className='mast'>*</span>
                                <FormControl className='form-item'
                                    {
                                    ...getFieldProps('phone', {
                                        initialValue: '',
                                        validateTrigger: 'onBlur',
                                        rules: [{
                                            required: true, message: '请输入手机号',
                                        }, {
                                            pattern: /^\d{11}$/, message: '手机号格式不正确'
                                        }],
                                    })
                                    }
                                />
                                <span className='error'>
                                    {getFieldError('phone')}
                                </span>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>提单号：</Label>
                                <FormControl className='form-item'
                                    {
                                    ...getFieldProps('ladingId', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>运输方式：</Label>
                                <Select className='form-item' {
                                    ...getFieldProps('transportation', {
                                        initialValue: '0',
                                    }
                                    )}>
                                    <Option value="0">公路</Option>
                                    <Option value="1">水路</Option>
                                    <Option value="2">铁路</Option>
                                    <Option value="3">航空</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>车牌号：</Label>
                                <FormControl className='form-item'
                                    {
                                    ...getFieldProps('licenseNumber', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>站名：</Label>
                                <FormControl className='form-item'
                                    {
                                    ...getFieldProps('station', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>收货人地址：</Label>
                                <FormControl className='form-item'
                                    {
                                    ...getFieldProps('consigneeAddress', {
                                        initialValue: '',
                                    })
                                    }
                                />
                            </FormItem>
                        </Col>

                    </Row>
                </div>


                <Row className='table-list'>
                    <Col md={12}>
                        <Table
                            loading={{ show: this.state.loading, loadingType: "line" }}
                            bordered
                            title={() => <span>
                                {/* <span className="table-short-tip">新增一行：ctrl + alt + n,快速保存：alt + s</span> */}
                                <Hotkeys
                                    keyName="alt+s"
                                    onKeyDown={this.saveForm}
                                ></Hotkeys>
                                <Hotkeys
                                    keyName="ctrl+alt+n,control+alt+n"
                                    onKeyDown={this.handlerAddClick}
                                >
                                    <Tooltip placement="left" inverse overlay={<div>快捷键：<br />新增一行：ctrl + alt + n<br />快速保存：alt + s</div>}>
                                        <Icon type="uf-exc-c-o" />
                                    </Tooltip>
                                    <Button size="sm" shape="border" onClick={this.handlerAddClick} colors="primary">添加明细</Button>
                                </Hotkeys>
                            </span>}
                            emptyText={() => <NoData />}
                            data={list}
                            rowKey={r => r.id}
                            columns={this.columns}
                            scroll={{ x: "120%", y: 520 }}
                            footer={() => <Pagination
                                first
                                last
                                boundaryLinks
                                items={this.props.total}
                                activePage={this.props.pageIndex}
                                onSelect={this.handleSelect}
                                onDataNumSelect={this.dataNumSelect}
                                showJump={true}
                                dataNum={1}
                            />}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.createForm()(List);
