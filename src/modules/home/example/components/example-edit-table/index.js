import React, { Component } from 'react'
import { Table,Button } from 'tinper-bee'
import moment from "moment/moment";

export default class BoardTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
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
            actions.planapply.updateState({
                list: newData
            });
        }
    }
    handleChange = (value, id, column) => {
        const newData = [...this.props.list];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            target[column] = value;
            actions.planapply.updateState({
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
            actions.planapply.updateState({
                list: newData
            });
        } else {
            if (target) {
                target.editable = true;
                actions.planapply.updateState({
                    list: newData
                });
            }
        }
    }
    save = async (id) => {
        this.setState({ loading: true });
        const newData = [...this.props.list];
        const target = newData.filter(item => id === item.id)[0];
        if (target) {
            delete target.editable;
            actions.planapply.updateState({
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
            let result = await actions.planapply.saveList(newRow);
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
            actions.planapply.updateState({
                list: newData
            });
        } else {
            if (target) {
                Object.assign(target, this.cacheData.filter(item => id === item.id)[0]);
                delete target.editable;
                actions.planapply.updateState({
                    list: newData
                });
            }
        }
    }
    remove = async (id) => {
        this.setState({ loading: true });
        console.log('删除ID：', id);
        let result = await actions.planapply.removeList(id);
        if (result.data.success) {
            this.setState({ loading: false });
            this.loadList();
        }
    }
    handleSelect = (eventKey) => {
        actions.planapply.updateState({ pageIndex: eventKey });
        this.loadList();
    }

    dataNumSelect = (index, value) => {
        actions.planapply.updateState({ pageSize: value });
    }
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
        actions.planapply.updateState({
            list: newData
        });
    }

    
    render(){
        const self=this;
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
                title: "期望到货日期",
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
        const { list,showLoading,pageSize, pageIndex, totalPages, } = this.props;
        return (
            <div className="table-list">
                <Table
                    loading={{ show: this.state.loading, loadingType: "line" }}
                    bordered
                    title={() => <Button size="sm" shape="border" onClick={this.handlerAddClick} colors="primary">添加明细</Button>}
                    data={list}
                    rowKey={r => r.id}
                    columns={this.columns}
                    scroll={{ y: 520 }}
                />
                
            </div>
        )
    }
}