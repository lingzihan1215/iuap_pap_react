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

class EditTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,//内部使用加载数据loading
        }
    }
    componentDidMount = () => {
        this.loadList();//加载表格数据
    }
    /**
     * 加载表格数据
     */
    loadList = async () => {
        this.setState({ loading: true });
        let data = await actions.editTable.getList();
        if(data){
            this.cacheData = data.map(item => ({ ...item }));
            this.setState({ loading: false });
        }
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
            actions.editTable.updateState({
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
            actions.editTable.updateState({
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
            actions.editTable.updateState({
                list: newData
            });
        } else {
            if (target) {
                target.editable = true;
                actions.editTable.updateState({
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
            actions.editTable.updateState({
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
            let result = await actions.editTable.saveList(newRow);
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
            actions.editTable.updateState({
                list: newData
            });
        } else {
            if (target) {
                Object.assign(target, this.cacheData.filter(item => id === item.id)[0]);
                delete target.editable;
                actions.editTable.updateState({
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
        let result = await actions.editTable.removeList(id);
        if (result.data.success) {
            this.setState({ loading: false });
            this.loadList();
        }
    }
    /**
     * 分页数据改变回调
     */
    handleSelect = (eventKey) => {
        actions.editTable.updateState({ pageIndex: eventKey });
        this.loadList();
    }
    /**
     * 分页数据改变回调
     */
    dataNumSelect = (index, value) => {
        actions.editTable.updateState({ pageSize: value });
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
        actions.editTable.updateState({
            list: newData
        });
    }
    saveAll = () =>{
        alert('数据在控制台输出，请查看');
        console.log(this.props.list);
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
                <Header title='表格编辑示例' />
                <div className='file-src'>文件位置：src/modules/examples/edit-table</div>
                <div className='table-list clearfix'>
                    <Row>
                        <Col md={12}>
                            <Table
                                loading={{ show: this.state.loading, loadingType: "line" }}
                                bordered
                                title={() => (<div>
                                                <Button size="sm" shape="border" onClick={this.handlerAddClick} colors="primary">添加明细</Button>
                                                <Button size="sm" shape="border" onClick={this.saveAll} style={{'marginLeft':'10px'}} colors="primary">获取数据</Button>
                                            </div>)}
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

export default Form.createForm()(EditTable);
