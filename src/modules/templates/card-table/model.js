import { actions } from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service"; 
// 接口返回数据公共处理方法，根据具体需要
import { processData } from "utils"; 

export default {
    // 确定 Store 中的数据模型作用域
    name: "cardTable", 
    // 设置当前 Model 所需的初始化 state
    initialState: {  
        showLoading:false,
        list: [],
        pageIndex:0,
        pageSize:10,
        totalPages:1
    },
    reducers: {
        /**
         * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新。
         * @param {*} state 
         * @param {*} data 
         */
        updateState(state, data) { //更新state
            return {
                ...state,
                ...data
            };
        }
    },
    effects: { 
        async getList(param, getState) {
            let { pageIndex, pageSize } = getState().delivery;
            let { data: { detailMsg, success } } = await api.getList({
              pageIndex: pageIndex - 1,
              pageSize
            });
            if (success) {
              actions.planapply.updateState({ list: detailMsg.data.content, total: detailMsg.data.totalPages });
              return detailMsg.data.content;
            }
          },
          async removeList(id, getState) {
            let result = await api.deleteList([{
              id
            }]);
            return result;
          },
          async saveList(form, getState) {
            let result = await api.saveList(form);
            return result;
          },
          async getFactory(param,getState){
            actions.planapply.updateState({
              factory:[
                {
                    name:'工厂A',code:'a'
                },
                {
                    name:'工厂B',code:'b'
                },
                {
                    name:'工厂C',code:'c'
                },
                {
                    name:'工厂D',code:'d'
                },
                {
                    name:'工厂E',code:'e'
                },
            ]
            })
          }
    }
};