import { actions } from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service"; 
// 接口返回数据公共处理方法，根据具体需要
import { processData } from "utils"; 

export default {
    // 确定 Store 中的数据模型作用域
    name: "example", 
    // 设置当前 Model 所需的初始化 state
    initialState: {  
        showLoading:false,
        list: [],
        orderTypes:[],
        pageIndex:0,
        pageSize:10,
        totalPages:1,
        detail:{},
        searchParam:{},
        validateNum:99,//不存在的step
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
        /**
         * 加载列表数据
         * @param {*} param 
         * @param {*} getState 
         */
        async loadList(param, getState) {
            // 正在加载数据，显示加载 Loading 图标
            actions.example.updateState({ showLoading:true })
            if(param){
                param.pageIndex = param.pageIndex ? param.pageIndex - 1 : 0;
                param.pageSize = param.pageSize ? param.pageSize : 10;
            } else {
                param = {}
            }
            // 调用 getList 请求数据
            let res = processData(await api.getList(param)); 
            
            actions.example.updateState({  showLoading:false })

            if (res) {
                if(res.content&&res.content.length){
                    for(var i=0;i<res.content.length;i++){
                        res.content[i].key=i+1;
                    }
                }
                actions.example.updateState({
                    list: res.content,
                    pageIndex:res.number + 1,
                    pageSize:res.size,
                    totalPages:res.totalPages,
                });
            }
        },
        /**
         * getSelect：获取下拉列表数据
         * @param {*} param 
         * @param {*} getState 
         */
        getOrderTypes(param,getState){
            actions.example.updateState({
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
            })
        },
        /**
         * getSelect：保存table数据
         * @param {*} param 
         * @param {*} getState 
         */
        async saveList(param, getState) {
            let result = await api.saveList(param);
            return result;
        },
        /**
         * 删除table数据
         * @param {*} id 
         * @param {*} getState 
         */
        async removeList(id, getState) {
            let result = await api.deleteList([{id}]);
            return result;
        },
    }
};