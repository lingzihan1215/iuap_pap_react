
import { actions } from "mirrorx";
import * as api from "./services";
import { processData } from "utils";


export default {
  name: "order",
  initialState: {
    showLoading:false,
    list: [],
    orderTypes:[],
    pageActive:1,
    pageSize:10,
    totalPages:1,
    detail:{}
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
      actions.order.updateState({
        showLoading:true
      })
      if(!param)param={};
      let { data: { data, success } } = await api.getList(param);
      actions.order.updateState({
        showLoading:false
      })
      if (success) {
        actions.order.updateState({ 
          list: data,
          pageActive:param.pageActive==undefined?1:param.pageActive,
          pageSize:param.pageSize||10,
          totalPages:10,
        });
      }
    },

    async getOrderType(param,getState){//订单类型
      let { data: { data, success } } = await api.getOrderType(param);
      if (success) {
        actions.order.updateState({ 
          orderTypes: data
        });
      }
    }

  }
};
