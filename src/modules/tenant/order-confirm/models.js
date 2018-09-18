
import { actions } from "mirrorx";
import * as api from "./services";
import { processData } from "utils";


export default {
  name: "order",
  initialState: {
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
      if(!param)param={};
      let { data: { data, success } } = await api.getList(param);
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
        actions.order.updateState({
          orderTypes:[{
            code:'D001',
            name:'D001'
          },{
            code:'D002',
            name:'D002'
          },{
            code:'D003',
            name:'D003'
          },{
            code:'D004',
            name:'D004'
          }]
        })
    }

  }
};
