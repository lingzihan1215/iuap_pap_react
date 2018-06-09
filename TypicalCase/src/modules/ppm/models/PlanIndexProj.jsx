import React, { Component } from "react";
import { actions } from "mirrorx";
import * as api from "../services/PlanIndexProj";
import moment from "moment";

export default {
  name: "PlanIndexProj",
  initialState: {
    addShow: "",
    showModul: false,
    showText: "新增",
    treeData: [],
    currentNode: ""
  },
  reducers: {
    save(state, data) {
      return {
        ...state,
        ...data
      };
    }
  },
  effects: {
    // 初始化
    async load() {
      let {
        data: { success, detailMsg }
      } = await api.get_tree();
      console.log(detailMsg);
      if (success) {
        actions.PlanIndexProj.save({ treeData: detailMsg.data });
      } else {
        Error("数据请求失败");
      }
    },
    // 获取树表数据
    getTree() {},
    // 展示模态框
    showModul(data) {
      actions.PlanIndexProj.save({ showModul: data });
    },
    // 新增数据
    addTreeData(data) {
      console.log(data);
    },
    // 点击树表结构
    onTreeClick(data) {
      actions.PlanIndexProj.save({ currentNode: data });
    }
  }
};
