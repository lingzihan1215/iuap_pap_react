
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
      let res={
        pageActive:1,
        pageSize:10,
        totalPages:10,
        ctn:[
          {
            id:'asd1234567sda890131d21asd23',
            key:'1',
            index:'1',
            orderCode:'0001',
            supplier:'10082',
            supplierName:'山东吉华重工',
            type:'NB',
            purchasing:'1300',
            purchasingGroup:'469',
            voucherDate:'2016-06-05',
            approvalState:'已审批',
            confirmState:'已确认',
            closeState:'已关闭',
          },
          {
            id:'oiutu02318247324j23432914',
            key:'2',
            index:'2',
            orderCode:'0001',
            supplier:'10082',
            supplierName:'山东吉华重工',
            type:'NB',
            purchasing:'1300',
            purchasingGroup:'469',
            voucherDate:'2016-06-05',
            approvalState:'已审批',
            confirmState:'已确认',
            closeState:'已关闭',
          },

        ]
      }
      console.log(param)
      if(!param)param={};
      actions.order.updateState({
        list:res.ctn,
        pageActive:param.pageActive==undefined?res.pageActive:param.pageActive,
        pageSize:param.pageSize||res.pageSize,
        totalPages:res.totalPages,
      })
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
