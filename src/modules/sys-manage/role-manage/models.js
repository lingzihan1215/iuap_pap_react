
import { actions } from "mirrorx";
import * as api from "./services";
import { processData } from "utils";


export default {
  name: "role",
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
      actions.role.updateState({
        showLoading:true
      })
      if(!param)param={};
      let res= processData(await api.getList(param));
      actions.role.updateState({
        showLoading:false
      })
      if (res) {
        actions.order.updateState({ 
          list: res.content,
          pageActive:res.number+1,
          pageSize:res.size,
          totalPages:res.totalPages,
        });
      }
    },
    async saveRole(param,getState){//保存
      actions.role.updateState({
        showLoading:true
      })
      await api.saveRole(param);
      actions.role.updateState({
        showLoading:false
      })
    },
  }
};
