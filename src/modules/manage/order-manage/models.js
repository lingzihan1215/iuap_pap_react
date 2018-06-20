import { actions } from "mirrorx";
import * as api from "./services"; //引入services，如不需要接口请求可不写
import { processData } from "utils"; //接口返回数据公共处理方法，根据具体需要

export default {
  name: "orderTest", //设置主具模型名称
  initialState: {  // 初始化
    showLoading:false,
    list: [],
    orderTypes:[],
    pageIndex:1,
    pageSize:10,
    totalPages:1,
    detail:{}
  },
  reducers: {
      updateState(state, data) { //更新state
      return {
        ...state,
        ...data
      };
    }
  },

  effects: { //处理异步请求
    //例如：使用以上service.js定义的获取列表数据的请求
    async loadList(param, getState) {//加载数据 
      actions.orderTest.updateState({ //显示loading
        showLoading:true
      })
      let res= processData(await api.getList(param)); //调用service.js配置的方法
      actions.orderTest.updateState({ //隐藏loading
        showLoading:false
      })
      if (res) {
        actions.orderTest.updateState({ //更新state
          list: res.content,
          pageIndex:res.number+1,
          pageSize:res.size,
          totalPages:res.totalPages,
        });
      }
    },
  }
};