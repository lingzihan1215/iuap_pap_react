
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
    total:0,
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
          total:res.data.totalElements,
        });
      }
    },

    async delItem(param,getState){
      actions.tenant.updateState({
        showLoading:true
      })
      let res=processData(await api.delOrder(param.param),'删除成功');
      actions.tenant.loadList();
    },

    async save(param,getState){//保存，新增或更新租户
      actions.tenant.updateState({
        showLoading:true
      })
      let res=processData(await api.saveTenant(param),'保存成功');
      if(res){
         window.history.go(-1);
      }
      actions.tenant.updateState({
        showLoading:false
      });
    },

    async updateStatus(param){//更新租户状态
      actions.tenant.updateState({
        showLoading:true
      })
      let res=processData(await api.updateStatus(param),'保存成功');
      actions.tenant.updateState({
        showLoading:false
      });

      // actions.tenant.loadList();
    },

  }
};
