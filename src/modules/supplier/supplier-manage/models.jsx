
import { actions } from "mirrorx";
import * as api from "./services";
import { processData } from "utils";


export default {
  name: "supplier",
  initialState: { 
    showLoading:false,
    list: [],
    orderTypes:[],
    pageIndex:1,
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
      actions.supplier.updateState({
        showLoading:true
      })
      if(param){
        param.pageIndex=param.pageIndex-1;
        param.pageSize=param.pageSize;
      }else{
        param={}
      }
      let res= processData(await api.getList(param));
      actions.supplier.updateState({
        showLoading:false
      })
      if (res) {
        actions.supplier.updateState({ 
          list: res.content,
          pageIndex:res.number+1,
          pageSize:res.size,
          totalPages:res.totalPages,
        });
      }
    }
  }


};
