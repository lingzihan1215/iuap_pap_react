
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
      if(param){
        param.pageIndex=param.pageActive?param.pageActive-1:1;
        param.pageSize=param.pageSize?param.pageSize:10;
      }else{
        param={}
      }
      let res= processData(await api.getList(param));
      actions.role.updateState({
        showLoading:false
      })
      if (res) {
        actions.role.updateState({ 
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
      let res=processData(await api.saveRole(param),'保存成功');
      if(res){
         window.history.go(-1);
      }
      actions.role.updateState({
        showLoading:false
      });
    },
    async delItem(param,getState){
      actions.role.updateState({
        showLoading:true
      })
      let res=processData(await api.delRole(param.param),'删除成功');
      actions.role.updateState({
        showLoading:false
      });
      if(res){
        let list=getState().role.list;
        list.splice(param.index,1);
      }
    }
  }
};
