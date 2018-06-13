import React, { Component } from "react";
import { actions } from "mirrorx";
import { Table, Button, Col, Row, FormControl, InputNumber, Popconfirm, Message } from "tinper-bee";
import Pagination from 'bee-pagination';
import NoData from 'components/NoData';
import Form from 'bee-form';
import './list.less';
const FormItem = Form.FormItem;


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false//内部使用加载数据loading
        }
        //表格列
        this.columns = [
            {
                title: "订单号",
                dataIndex: "orderCode",
                key: "orderCode",
                width: "8%",
                render: (text, record) => this.renderColumns(text, record, 'orderCode')
            },
            {
                title: "序号",
                dataIndex: "id",
                key: "id",
                width: "5%",
                render: (text, record) => this.renderColumns(text, record, 'id')
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
                dataIndex: "code",
                key: "code",
                width: "10%",
                render: (text, record) => this.renderColumns(text, record, 'code')
            },
            {
                title: "物料名称",
                dataIndex: "name",
                key: "name",
                width: "12%",
                render: (text, record) => this.renderColumns(text, record, 'name')
            },
            {
                title: "订单数量",
                dataIndex: "orderNumber",
                key: "orderNumber",
                width: "5%",
                render: (text, record) => this.renderColumnsInputNumber(text, record, 'orderNumber')
            },
            {
                title: "已收数量",
                dataIndex: "receNumber",
                key: "receNumber",
                width: "5%",
                render: (text, record) => this.renderColumnsInputNumber(text, record, 'receNumber')
            },
            {
                title: "发货数量",
                dataIndex: "deliveNumber",
                key: "deliveNumber",
                width: "5%",
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
    }
    componentDidMount = () => {
        this.loadList();//加载表格
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
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.id, column)}
            />
        );
    }
    //渲染列
    renderColumnsInputNumber = (text, record, column) => {
        return (
            <this.EditableCellInputNumber
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.id, column)}
            />
        );
    }
    //修改行指定数据key
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
    save = (id) => {
        const newData = [...this.props.list];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            delete target.editable;
            actions.delivery.updateState({
                list: newData
            });
            this.cacheData = newData.map(item => ({ ...item }));
            let newRow = this.cacheData.filter(item => id === item.id)[0];
            console.log(newRow);
            if (newRow.isNew) {
                //判断是否新增还是编辑区别是是否存在id
                delete newRow.isNew;
                delete newRow.id;
            }
            console.log(newRow);
            //TO DO : Save Data
            actions.delivery.saveList(newRow);
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
    remove = async (id) => {
        this.setState({ loading: true });
        console.log('删除ID：', id);
        let result = await actions.delivery.removeList(id);
        if (result.data.success) {
            Message.create({ content: '删除成功', color: 'success' });
        }
        this.setState({ loading: false });
    }
    handleSelect = (eventKey) => {
        actions.delivery.updateState({ activePage: eventKey });
        this.loadList();
    }

    dataNumSelect = (index, value) => {
        actions.delivery.updateState({ pageSize: value });
    }
    handlerAddClick = () => {
        const newData = [...this.props.list];
        const item = {
            editable: true,
            isNew: true,
            orderCode: "",
            id: "011",
            prodbatch: "",
            code: "",
            name: "",
            orderNumber: "1",
            receNumber: "1",
            deliveNumber: "1",
            unit: "PC"
        };
        newData.push(item);
        actions.delivery.updateState({
            list: newData
        });
    }
    render() {
        let { list } = this.props;
        return (
            <div className='order-delivery-wrap'>
                <Row>
                    <Col md={12}>
                        <Table
                            loading={{ show: this.state.loading, loadingType: "line" }}
                            bordered
                            title={() => <Button size="sm" shape="border" onClick={this.handlerAddClick} colors="primary">添加明细</Button>}
                            emptyText={() => <NoData />}
                            data={list}
                            rowKey={r => r.id}
                            columns={this.columns}
                            scroll={{ y: 520 }}
                            footer={() => <Pagination
                                first
                                last
                                boundaryLinks
                                items={this.props.total}
                                activePage={this.props.activePage}
                                onSelect={this.handleSelect}
                                onDataNumSelect={this.dataNumSelect}
                                showJump={true}
                            />}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.createForm()(List);
