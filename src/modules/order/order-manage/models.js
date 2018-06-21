
import { actions } from "mirrorx";
import * as api from "./services";
import { processData } from "utils";


export default {
  name: "order",
  initialState: {
    showLoading:false,
    list: [],
    orderTypes:[],
    pageIndex:1,
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
      if(param){
        param.pageIndex=param.pageIndex-1;
        param.pageSize=param.pageSize;
      }else{
        param={}
      }
      let res= processData(await api.getList(param));
      actions.order.updateState({
        showLoading:false
      })
      if (res) {
        if(res.content&&res.content.length){
          for(var i=0;i<res.content.length;i++){
              res.content[i].key=i+1;
          }
        }
        actions.order.updateState({ 
          list: res.content,
          pageIndex:res.number+1,
          pageSize:res.size,
          totalPages:res.totalPages,
        });
      }
    },

    async getOrderType(param,getState){//订单类型
      actions.order.updateState({ 
        orderTypes:  [{
          "code":"0",
          "name":"D001"
        },{
          "code":"1",
          "name":"D002"
        },{
          "code":"2",
          "name":"D003"
        },{
          "code":"3",
          "name":"D004"
        }]
      });
    },
    
    async delItem(param,getState){
      actions.order.updateState({
        showLoading:true
      })
      let res=processData(await api.delOrder(param.param),'删除成功');
      actions.order.loadList();
    },
    async save(param,getState){//保存
      actions.order.updateState({
        showLoading:true
      })
      let res=processData(await api.saveOrder(param),'保存成功');
      if(res){
         window.history.go(-1);
      }
      actions.order.updateState({
        showLoading:false
      });
    },

  }
};
