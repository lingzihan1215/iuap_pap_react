import React, { Component } from "react";
import { actions } from 'mirrorx';
import * as api from "../services/PlanIndexProj";
import { Info, Error } from "utils";
import { log } from 'util';
import { Tree } from 'tinper-bee';
import moment from "moment";
const TreeNode = Tree.TreeNode;

export default {
    name: "PlanIndexProj",
    initialState: {
        treeData: [{
            values: {
                classfication_name: {
                    value: '计划指标分类'
                },
                id: {
                    value: '0'
                },
                CONNECT_BY_ISLEAF: {
                    value: 0
                }
            }
        }],
        treeNodes: '',
        showModal: false,
        showAddModal: false,
        checkFormNow: false,
        isCheckOk: false,
        modalstate: 'add',
        searchParam: { seeDisable: false },
        dataList: [],
        PlanIndexProj: {},
        expandedKeys: [],
        selectedKeys: [],
        autoExpandParent: false,
        classfication_id: "",
        onLoadId: "",
        size: 10,
        number: 1,
        totalPages: '',
        totalElements: 0,
        selectedList: [],
        selectedRow:[]
    },
    reducers: {
        save(state, data) {
            return {
                ...state,
                ...data
            }
        }
    },
    effects: {
        async load_class(data, getState) {
            let onLoadId = "";
            if (getState().PlanIndexProj.onLoadId == '0') {
                onLoadId = "";
            } else {
                onLoadId = getState().PlanIndexProj.onLoadId;
            }
            let param = {
                page: 0,
                size: 10,
                searchParams: {
                    searchMap: {
                        parentid: onLoadId
                    }
                }
            };
            //console.log(JSON.stringify(param));
            let { data: { data: { head: { rows } }, success, message } } = await api.get_class(param);
            if (success) {
                if (rows.length > 0) {
                    let treeData = [...getState().PlanIndexProj.treeData];
                    let parentid = rows[0].values.parentid.value;
                    let isOk = false;
                    let loop = (Data) => {
                        Data.map((item) => {
                            if (item.values.id.value == parentid) {
                                item.values.children = rows;
                                isOk = true;
                                return;
                            } else if (item.values.children) {
                                loop(item.values.children);
                            }
                        });
                    };
                    if (parentid == null) {
                        treeData[0].values.children = rows;
                    } else {
                        loop(treeData);
                    }

                    let expandedKeys = getState().PlanIndexProj.expandedKeys;
                    let cancelLoop = (childrens) => {
                        childrens.map((item) => {
                            var index = expandedKeys.indexOf(item.values.id.value);
                            if (index > -1) {
                                expandedKeys.splice(index, 1);
                            }
                        });
                    }
                    cancelLoop(rows);
                    actions.PlanIndexProj.save({
                        treeData, expandedKeys
                    });
                    actions.PlanIndexProj.get_tree_data();
                }
            } else {
                Error(message);
            }
        },
        async load_proj(ids, getState) {
            let param = {
                page: getState().PlanIndexProj.number==0? 0 : getState().PlanIndexProj.number - 1,
                size: getState().PlanIndexProj.size,
                searchParams: {
                    searchMap: {

                    }
                }
            };
            if(ids[0] == undefined){
                let PlanIndexProj = {};
                let selectedKeys = [];
                let classfication_id = "";
                let dataList = [];
                let number = 1;
                let totalPages = '';
                let totalElements = 0;
                actions.PlanIndexProj.save({
                    dataList, PlanIndexProj, selectedKeys, classfication_id, number, totalElements, totalPages
                });
                return;
            }
            else if (ids[0] == "") {
                let searchParam = getState().PlanIndexProj.searchParam;
                param.searchParams.searchMap.classfication_id = null;
                param.searchParams.searchMap.index_code = searchParam.code == "" ? null : searchParam.code;
                param.searchParams.searchMap.index_name = searchParam.name == "" ? null : searchParam.name;
            } else {
                if(getState().PlanIndexProj.classfication_id!=ids[0]){
                    param.page = 0;
                }
                let PlanIndexProj = {};
                let selectedKeys = [ids[0]];
                let classfication_id = ids[0];
                param.searchParams.searchMap.classfication_id = ids[0];
                actions.PlanIndexProj.save({
                    PlanIndexProj, selectedKeys, classfication_id
                });
            }
            //console.log(JSON.stringify(param));
            let res = await api.get_proj(param);
            if (res.data.success) {
                let dataList = [];
                let size = 10;
                let number = 1;
                let totalPages = '';
                let totalElements = 0;
                if (res.data.data.head == undefined) {
                    //Info('该分类无计划指标项目！');
                } else {
                    //Info('获取指标项目成功！');
                    dataList = res.data.data.head.rows;
                    let pageinfo = res.data.data.head.pageinfo;
                    size = pageinfo.size;
                    number = pageinfo.number;
                    totalPages = pageinfo.totalPages;
                    totalElements = pageinfo.totalElements;
                }
                actions.PlanIndexProj.save({
                    dataList, size, number, totalElements, totalPages
                });
            } else {
                Error(res.data.message.message);
            }
        },
        async onChangePageIndex(page, getState) {
            let number = page;
            actions.PlanIndexProj.save({
                number
            });
            actions.PlanIndexProj.load_proj([getState().PlanIndexProj.classfication_id]);
        },
        async onChangePageSize(value, getState) {
            let number = 0;
            let size = value;
            actions.PlanIndexProj.save({
                number,size
            });
            actions.PlanIndexProj.load_proj([getState().PlanIndexProj.classfication_id]);
        },
        selectDel(data, getState) {
            let selectedList = data;
            actions.PlanIndexProj.save({
                selectedList
            });
        },
        row_click(data, getState) {
            let PlanIndexProj = data.record;
            let selectedRow = new Array(getState().PlanIndexProj.dataList.length);
            selectedRow[data.index] = true;
            actions.PlanIndexProj.save({
                PlanIndexProj,selectedRow
            });
        },
        qryValueChange(data, getState) {
            let searchParam = { ...getState().PlanIndexProj.searchParam };
            searchParam[data.key] = data.param;
            actions.PlanIndexProj.save({
                searchParam
            });
        },
        async qryByParam(data, getState) {
            let searchParam = getState().PlanIndexProj.searchParam;
            let param = {
                page: 0,
                size: 10,
                searchParams: {
                    searchMap: {

                    }
                }
            };
            param.searchParams.searchMap.classfication_id = null;
            param.searchParams.searchMap.index_code = searchParam.code == "" ? null : searchParam.code;
            param.searchParams.searchMap.index_name = searchParam.name == "" ? null : searchParam.name;
            //console.log(JSON.stringify(param));
            let res = await api.get_proj(param);
            //console.log(rows);
            if (res.data.success) {
                //Info('获取指标项目成功！');
                let dataList = [];
                let size = 10;
                let number = 1;
                let totalPages = '';
                let totalElements = 0;
                if (res.data.data.head == undefined) {
                    //Info('该分类无计划指标项目！');
                } else {
                    //Info('获取指标项目成功！');
                    dataList = res.data.data.head.rows;
                    let pageinfo = res.data.data.head.pageinfo;
                    size = pageinfo.size;
                    number = pageinfo.number;
                    totalPages = pageinfo.totalPages;
                    totalElements = pageinfo.totalElements;
                }
                let onLoadId = "";
                let classfication_id = "";
                let PlanIndexProj = {};
                let expandedKeys = [];
                let selectedKeys = [];
                let treeData = [...getState().PlanIndexProj.treeData];
                treeData[0].values.children = [];
                actions.PlanIndexProj.save({
                    dataList, size, number, totalElements, totalPages, onLoadId, classfication_id, PlanIndexProj, expandedKeys, selectedKeys, treeData
                });
                actions.PlanIndexProj.get_tree_data();
            } else {
                Error(res.data.message.message);
            }
        },
        ExpandHandler(data, getState) {
            let expandedKeys = data;
            actions.PlanIndexProj.save({
                expandedKeys
            });
        },
        qryValueClear(data, getState) {
            let searchParam = { ...getState().PlanIndexProj.searchParam };
            searchParam.code = '';
            searchParam.name = '';
            searchParam.creator_name = '';
            searchParam.seeDisable = false;
            let dataList = [];
            actions.PlanIndexProj.save({
                searchParam,
                dataList
            });
        },
        change_modalstate(data, getState) {
            let modalstate = data;
            //console.log(modalstate);
            actions.PlanIndexProj.save({
                modalstate
            });
        },
        showAddModal(data, getState) {
            if (getState().PlanIndexProj.modalstate == 'add' && (getState().PlanIndexProj.classfication_id == undefined || getState().PlanIndexProj.classfication_id == "")) {
                Error('未选中分类，无法新增项目！');
            } else {
                actions.PlanIndexProj.save({
                    showAddModal: true
                });
            }
        },
        closeAddModal(data, getState) {
            actions.PlanIndexProj.save({
                showAddModal: false
            });
        },
        showModal(data, getState) {
            actions.PlanIndexProj.save({
                showModal: true
            });
        },
        closeModal(data, getState) {
            actions.PlanIndexProj.save({
                showModal: false
            });
        },
        startCheck(data, getState) {
            actions.PlanIndexProj.changeCheckFlag({ checkFormNow: true, isCheckOk: false });
        },
        changeCheckFlag(data, getState) {
            actions.PlanIndexProj.save({
                checkFormNow: data.checkFormNow,
                isCheckOk: data.isCheckOk
            });
        },
        en_disable(data, getState) {

        },
        async saveData(data, getState) {
            if (getState().PlanIndexProj.isCheckOk) {
                //console.log("checkSuccess");

                let state;
                let PlanIndexProj = { ...getState().PlanIndexProj.PlanIndexProj };
                if (getState().PlanIndexProj.modalstate == 'add') {
                    state = 2;
                    if (PlanIndexProj.values) {
                        PlanIndexProj.values.id = null;
                    }
                } else if (getState().PlanIndexProj.modalstate == 'edit') {
                    state = 1;
                }
                let param = {
                    data: {
                        head: {
                            pageinfo: null,
                            rows: [
                                {

                                }
                            ]
                        }
                    }
                };
                if (PlanIndexProj.values == undefined) {
                    PlanIndexProj = {
                        values: {
                            index_code: {},
                            index_name: {},
                            measureunit: {},
                            isauto: {},
                            classfication_id: { value: getState().PlanIndexProj.classfication_id },
                            orgid_name: { value: "gc1" },
                            creator_name: { value: "wangke" }
                        }
                    }
                }
                PlanIndexProj.values.index_code.value = data[0].value;
                PlanIndexProj.values.index_name.value = data[1].value;
                PlanIndexProj.values.measureunit.value = data[2].value;
                PlanIndexProj.values.isauto.value = data[3].value == true ? 0 : 1;
                PlanIndexProj.status = state;
                // var ts = moment().format('YYYY-MM-DD HH:mm:ss');
                // console.log(ts);
                param.data.head.rows[0] = PlanIndexProj;
                //console.log(JSON.stringify(param));
                let res = getState().PlanIndexProj.modalstate == 'add' ? await api.add(param) : await api.update(param);
                if (res.data.success) {
                    getState().PlanIndexProj.modalstate == 'add' ? Info('增加指标项目成功！') : Info('更新指标项目成功！');
                    actions.PlanIndexProj.load_proj([getState().PlanIndexProj.classfication_id]);
                } else {
                    Error(res.data.message.message);
                }
                actions.PlanIndexProj.closeAddModal();
            } else {
                Error("表单校验失败！");
            }
            actions.PlanIndexProj.changeCheckFlag({ checkFormNow: false, isCheckOk: false });
        },
        async delete(data, getState) {
            let param = {
                data: {
                    head: {
                        rows: [
                            {
                                rowId: null,
                                values: {
                                    id: {
                                        display: null,
                                        scale: -1,
                                        value: ""
                                    },
                                    ts: {
                                        display: null,
                                        scale: -1,
                                        value: ""
                                    },
                                    tenantid: {
                                        display: null,
                                        scale: -1,
                                        value: ""
                                    }

                                }
                            }
                        ]
                    }
                }
            };
            param.data.head.rows = getState().PlanIndexProj.selectedList;
            let { data: { success, message } } = await api.remove(param);
            if (success) {
                Info('项目删除成功！');
                actions.PlanIndexProj.load_proj([getState().PlanIndexProj.classfication_id]);
            } else {
                Error('项目删除失败！');
            }
            actions.PlanIndexProj.closeModal();
        },
        async get_tree_data(treeData, getState) {
            const loop = data => data.map((item) => {
                if (item.values.children) {
                    return <TreeNode title={item.values.classfication_name.value} key={item.values.id.value} titleStyle={{ color: '#08c' }}>{loop(item.values.children)}</TreeNode>;
                }
                return <TreeNode title={item.values.classfication_name.value} key={item.values.id.value} isLeaf={item.values.CONNECT_BY_ISLEAF.value == 1} />;
            });
            const treeNodes = loop(getState().PlanIndexProj.treeData);
            actions.PlanIndexProj.save({
                treeNodes: treeNodes
            });
        },
        async loadData(data, getState) {
            getState().PlanIndexProj.onLoadId = data.props.eventKey;
            actions.PlanIndexProj.load_class();
        }
    }
}