
import { actions } from "mirrorx";
import * as api from "./services";
import { processData } from "utils";


export default {
  name: "tenant",
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
      //显示加载框
      actions.tenant.updateState({
        showLoading:true
      })

      //参数赋值
      if(param){
        param.pageIndex=param.pageIndex-1;
        param.pageSize=param.pageSize;
      }else{
        param={}
      }

      //调用后台url
      let res= processData(await api.getList(param)); 

      //消除加载框
      actions.tenant.updateState({
        showLoading:false
      })

      //解析返回数据
      if (res) {
        if(res.data.content&&res.data.content.length){
          for(var i=0;i<res.data.content.length;i++){
              res.data.content[i].key=i+1;
          }
        }

        //更新tenant组件
        actions.tenant.updateState({ 
          list: res.data.content,
          pageIndex:res.data.number+1,
          pageSize:res.data.size,
          totalPages:res.data.totalPages,
        });
      }
    },

    async getOrderType(param,getState){//订单类型
      actions.tenant.updateState({ 
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
      actions.tenant.updateState({
        showLoading:true
      })
      let res=processData(await api.delOrder(param.param),'删除成功');
      actions.tenant.loadList();
    },

    async save(param,getState){//保存
      actions.tenant.updateState({
        showLoading:true
      })
      let res=processData(await api.saveOrder(param),'保存成功');
      if(res){
         window.history.go(-1);
      }
      actions.tenant.updateState({
        showLoading:false
      });
    },

  }
};
