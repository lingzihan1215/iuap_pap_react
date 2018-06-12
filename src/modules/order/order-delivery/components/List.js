import React, { Component } from "react";
import { actions } from "mirrorx";
import { Table, Button, Col, Row, FormControl, InputNumber, Popconfirm } from "tinper-bee";
import Pagination from 'bee-pagination';
import NoData from 'components/NoData';
import Form from 'bee-form';
import './list.less';
const FormItem = Form.FormItem;


class List extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.columns = [
            {
                title: "订单号",
                dataIndex: "orderCode",
                key: "orderCode",
                width: 100
            },
            {
                title: "序号",
                dataIndex: "id",
                key: "id",
                width: 100
            },
            {
                title: "生产批次",
                dataIndex: "prodbatch",
                key: "prodbatch",
                width: 100,
                render: (text, record) => this.renderColumns(text, record, 'prodbatch')
            },
            {
                title: "物料编码",
                dataIndex: "code",
                key: "code",
                width: 100
            },
            {
                title: "物料名称",
                dataIndex: "name",
                key: "name",
                width: 100
            },
            {
                title: "订单数量",
                dataIndex: "orderNumber",
                key: "orderNumber",
                width: 60
            },
            {
                title: "已收数量",
                dataIndex: "receNumber",
                key: "receNumber",
                width: 60
            },
            {
                title: "发货数量",
                dataIndex: "deliveNumber",
                key: "deliveNumber",
                width: 60,
                render: (text, record) => this.renderColumnsInputNumber(text, record, 'deliveNumber')
            },
            {
                title: "单位",
                dataIndex: "unit",
                key: "unit",
                width: 100
            },
            {
                title: "操作",
                dataIndex: "op",
                key: "op",
                width: 100,
                render: (text, record, index) => {
                    const { editable } = record;
                    return (<span>
                        {editable ? <span>
                            <Button colors="primary" style={{ 'marginRight': '4px' }} onClick={() => this.save(record.id)} size="sm">保存</Button>
                            <Button onClick={() => this.cancel(record.id, index)} size="sm">取消</Button>
                        </span>
                            : <span><Button style={{ 'marginRight': '4px' }} onClick={() => this.edit(record.id)} size="sm" colors="primary" >编辑</Button>
                                <Popconfirm placement="left" content="是否确认删除?" onClose={() => this.remove(index)} >
                                    <Button colors="danger" size="sm">删除</Button>
                                </Popconfirm></span>
                        }
                    </span>)
                    // return <div>
                    //     <Button style={{ 'marginRight': '4px' }} onClick={() => this.edit(record.id)} size="sm" colors="primary" >编辑</Button>
                    // </div>
                }
            }
        ];
    }
    componentDidMount = () => {
        this.loadList();
    }
    loadList = async () => {
        let data = await actions.delivery.getList();
        this.cacheData = data.map(item => ({ ...item }));
    }
    EditableCell = ({ editable, value, onChange }) => (
        <div>
            {editable
                ? <FormControl value={value} onChange={value => onChange(value)} />
                : value
            }
        </div>
    );
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

    renderColumns = (text, record, column) => {
        return (
            <this.EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.id, column)}
            />
        );
    }
    renderColumnsInputNumber = (text, record, column) => {
        return (
            <this.EditableCellInputNumber
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.id, column)}
            />
        );
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
    handleSelect = (eventKey) => {
        console.log(eventKey);
    }

    dataNumSelect = (index, value) => {
        alert('下拉的index=' + index);
        alert('值=' + value)
    }
    render() {
        let { list } = this.props;
        return (
            <div className='order-delivery-wrap'>
                <Row>
                    <Col md={12}>
                        <Table
                            bordered
                            title={() => <Button onClick={() => actions.delivery.getList()} colors="primary">添加明细</Button>}
                            emptyText={() => <NoData />}
                            data={list}
                            rowKey={r => r.id}
                            columns={this.columns}
                            scroll={{ y: 400 }}
                            footer={() => <Pagination
                                first
                                last
                                prev
                                next
                                boundaryLinks
                                items={11}
                                activePage={1}
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
