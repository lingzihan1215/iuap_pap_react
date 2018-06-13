
import { actions } from "mirrorx";
import * as api from "./services";
import { processData } from "utils";


export default {
  name: "user",
  initialState: {
    showLoading:false,
    list: [],
    pageActive:1,
    pageSize:10,
    totalPages:1
  },
  reducers: {
    updateState(state, data) {
      return {
        ...state,
        ...data
      };
    }
  },
  effects: {
    async loadList(param, getState) {//加载数据
      actions.user.updateState({
        showLoading:true
      })
      if(!param)param={};
      let { data: { data, success } } = await api.getList(param);
      actions.user.updateState({
        showLoading:false
      })
      if (success) {
        actions.user.updateState({ 
          list: data,
          pageActive:param.pageActive==undefined?1:param.pageActive,
          pageSize:param.pageSize||10,
          totalPages:10,
        });
      }
    },
    async saveUser(param,getState){//保存
      actions.user.updateState({
        showLoading:true
      })
      await api.saveUser(param);
      actions.user.updateState({
        showLoading:false
      })
    },
  }
};
