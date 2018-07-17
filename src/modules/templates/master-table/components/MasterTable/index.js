import React, { Component } from 'react'
import PaginationTable from 'components/PaginationTable'
import { BpmButtonSubmit, BpmButtonRecall } from 'yyuap-bpm';
import { actions } from 'mirrorx';
import { Button, Message } from 'tinper-bee';
import moment from "moment/moment";
import Header from 'components/Header';
import Searchform from '../Search-form';

import './index.less'

export default class MasterTable extends Component {
    constructor(props) {
        super(props);
        let self = this;
        this.state = {
            // 表格中所选中的数据，拿到后可以去进行增删改查
            selectData: [],
            column: [
                {
                    title: "序号",
                    dataIndex: "index",
                    key: "index",
                    width: 200,
                    render(record, text, index) {
                        return index + 1;
                    }
                },
                {
                    title: "宠物标识",
                    dataIndex: "petIdSr",
                    key: "petIdSr",
                    width: 200,
                },
                {
                    title: "单价",
                    dataIndex: "quantity",
                    key: "quantity",
                    width: 200,
                },
                {
                    title: "发货日期",
                    dataIndex: "shipDate",
                    key: "shipDate",
                    width: 200,
                },
                {
                    title: "状态",
                    dataIndex: "status",
                    key: "status",
                    width: 200,
                },
                {
                    title: "完成状态",
                    dataIndex: "complete",
                    key: "complete",
                    width: 200,
                },
                {
                    title: "操作",
                    dataIndex: "d",
                    key: "d",
                    width: 100,
                    fixed: "right",
                    render(text, record, index) {
                        return (
                            <div className='operation-btn'>
                                <i size='sm' className='uf uf-search edit-btn' onClick={() => { self.cellClick(record, 2) }}></i>
                                <i size='sm' className='uf uf-pencil edit-btn' onClick={() => { self.cellClick(record, 1) }}></i>
                                <i size='sm' className='uf uf-del del-btn' onClick={() => { self.delItem(record, index) }}></i>
                            </div>
                        )
                    }
                }
            ]
        }
    }
    componentDidMount() {
        actions.mastertable.loadList();//table数据
    }
    tabelSelect = (data) => {//tabel选中数据
        this.setState({
            selectData: data
        })
    }
    /**
     * 编辑,详情，增加
     */

    cellClick = async (record, btnFlag) => {
        await actions.mastertable.updateState({
            rowData: record,
        });

        let id = "";
        if (record) {
            id = record["id"];
        }

        // 新增、编辑、查看时,先清空子表数据
        await actions.mastertable.updateState({
            childList:[],
            cacheArray:[]
        })
        
        actions.routing.push(
            {
                pathname: 'master-form',
                search: `?search_id=${id}&btnFlag=${btnFlag}`
            }
        )
    }
    // 行删除
    delItem = (record, index) => {
        actions.mastertable.delItem({
            param: [record],
            index: index
        });
    }
    onTableSelectedData = data => {

        this.setState({
            selectData: data
        })
    }
    onPageSizeSelect = (index, value) => {
        actions.mastertable.loadList({
            pageSize: value
        })
    }
    onPageIndexSelect = value => {
        actions.mastertable.loadList({
            pageIndex: value
        })
    }

    onSubmitSuc = async () => {
        await actions.mastertable.loadList();
        actions.mastertable.updateState({ showLine: false });
        Message.create({ content: '单据提交成功', color: 'success' });

    }
    // 提交操作初始执行操作
    onSubmitStart = () => {
        actions.mastertable.updateState({ showLine: true });

    }
    // 提交失败回调函数
    onSubmitFail = (error) => {
        actions.mastertable.updateState({ showLine: false });
        Message.create({ content: error.msg, color: 'danger' });

    }

    // 撤回成功，失败，开始回调函数
    onRecallSuc = async () => {
        await actions.searchTable.loadList();
        actions.mastertable.updateState({ showLine: false });
        Message.create({ content: '单据撤回成功', color: 'success' });

    }
    onRecallFail = (error) => {
        actions.mastertable.updateState({ showLine: false });
        Message.create({ content: error.msg, color: 'danger' });

    }
    onRecallStart = () => {
        actions.mastertable.updateState({ showLine: true });
    }

    //查看方法
    onExamine = async (text, record, index) => {
        await actions.mastertable.updateState({ rowData: record });
        await actions.routing.push(
            {
                pathname: 'ShowOff-edit',
                detailObj: record,
            }
        )
    }

    // 清空selectData
    clearSelData = () => {
        this.setState({
            selectData: []
        })
    }

    render() {
        const self = this;
        let { list, showLoading, pageIndex, pageSize, totalPages } = this.props;
        let { selectData } = this.state;
        return (
            <div className='master-table'>
                <Header title='主子表示例' back={true} />
                <Searchform {...this.props} />
                <div className='table-header'>
                    <Button size='sm' shape="border" onClick={() => { self.cellClick({}, 0) }}>
                        新增
                    </Button>
                    <BpmButtonSubmit
                        className="ml5 "
                        checkedArray={selectData}
                        funccode="react"
                        nodekey="003"
                        url={`${GROBAL_HTTP_CTX}/show_off/submit`}
                        onSuccess={this.onSubmitSuc}
                        onError={this.onSubmitFail}
                        onStart={this.onSubmitStart}
                    />
                    <BpmButtonRecall
                        className="ml5 "
                        checkedArray={selectData}
                        url={`${GROBAL_HTTP_CTX}/show_off/recall`}
                        onSuccess={this.onRecallSuc}
                        onError={this.onRecallFail}
                        onStart={this.onRecallStart}
                    />
                </div>
                <PaginationTable
                    data={list}
                    showLoading={showLoading}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    totalPages={totalPages}
                    columns={this.state.column}
                    checkMinSize={6}
                    getSelectedDataFunc={this.tabelSelect}
                    onTableSelectedData={this.onTableSelectedData}
                    onPageSizeSelect={this.onPageSizeSelect}
                    onPageIndexSelect={this.onPageIndexSelect}
                    scroll={{ x: 1300, y: 500 }}
                />
            </div>

        )

    }
}