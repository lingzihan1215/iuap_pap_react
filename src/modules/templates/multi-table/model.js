import { actions } from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service"; 
// 接口返回数据公共处理方法，根据具体需要
import { processData } from "utils"; 

export default {
    // 确定 Store 中的数据模型作用域
    name: "multi", 
    // 设置当前 Model 所需的初始化 state
    initialState: {  
        orderTypes:[],
        showLoadingParent:false,
        showLoadingChild:false,
        listParent: [],
        pageIndex:1,
        pageSize:10,
        totalPages:1,
        listChild:[]
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

        async getOrderType(param,getState){//订单类型
            actions.multi.updateState({ 
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

        /**
         * 获取主表数据
         * @param {*} param 
         * @param {*} getState 
         */
        async loadParent(param, getState) {
            // actions.multi.updateState({ showLoadingParent:true })
            // if(param){
            //     param.pageIndex = param.pageIndex ? param.pageIndex - 1 : 0;
            //     param.pageSize = param.pageSize ? param.pageSize : 10;
            // } else {
            //     param = {}
            // }
            // let res = processData(await api.getParentList(param)); 
            
            // actions.multi.updateState({  showLoadingParent:false })

            // if (res) {
            //     if(res.content&&res.content.length){
            //         for(var i=0;i<res.content.length;i++){
            //             res.content[i].key=i+1;
            //         }
            //     }
            //     actions.multi.updateState({
            //         listParent: res.content,
            //         pageIndex:res.number + 1,
            //         pageSize:res.size,
            //         totalPages:res.totalPages,
            //     });
            // }

            actions.multi.updateState({
                listParent: [
                    {
                        "key": "10",
                        "index": "10",
                        "orderCode": "0000",
                        "supplier": "10080",
                        "supplierName": "山东吉华重工",
                        "type": "NB",
                        "purchasing": "1300",
                        "purchasingGroup": "460",
                        "voucherDate": "2016-06-01",
                        "approvalState_name": "已审批",
                        "confirmState_name": "已确认",
                        "closeState_name": "已关闭",
                        "id":'id1'
                    }, {
                        "key": "11",
                        "index": "11",
                        "orderCode": "0001",
                        "supplier": "10081",
                        "supplierName": "山东吉华重工",
                        "type": "NB",
                        "purchasing": "1301",
                        "purchasingGroup": "461",
                        "voucherDate": "2016-06-01",
                        "approvalState": "已审批",
                        "confirmState": "已确认",
                        "closeState": "已关闭",
                        "id":'id2'
                    }, {
                        "key": "12",
                        "index": "12",
                        "orderCode": "0002",
                        "supplier": "10082",
                        "supplierName": "山东吉华重工",
                        "type": "NB",
                        "purchasing": "1302",
                        "purchasingGroup": "462",
                        "voucherDate": "2016-06-02",
                        "approvalState": "已审批",
                        "confirmState": "已确认",
                        "closeState": "已关闭",
                        "id":'id3'
                    }
                ]
            });
        },
        /**
         * 获取子表数据
         * @param {*} param 
         * @param {*} getState 
         */
        async loadChild(param, getState) {
            // actions.multi.updateState({ showLoadingChild:true })

            // let res = processData(await api.getChildList(param)); 
            
            // actions.multi.updateState({  showLoadingChild:false })

            // if (res) {
            //     if(res.content&&res.content.length){
            //         for(var i=0;i<res.content.length;i++){
            //             res.content[i].key=i+1;
            //         }
            //     }
            //     actions.multi.updateState({
            //         listChild: res.content
            //     });
            // }

            actions.multi.updateState({
                listChild: [
                    {
                        "key": "10",
                        "index": "10",
                        "orderCode": "0000"+param,
                        "supplier": "10080",
                        "supplierName": "山东吉华重工",
                        "type": "NB",
                        "purchasing": "1300",
                        "purchasingGroup": "460",
                        "voucherDate": "2016-06-01",
                        "approvalState": "已审批",
                        "confirmState": "已确认",
                        "closeState": "已关闭"
                    }, {
                        "key": "11",
                        "index": "11",
                        "orderCode": "0001"+param,
                        "supplier": "10081",
                        "supplierName": "山东吉华重工",
                        "type": "NB",
                        "purchasing": "1301",
                        "purchasingGroup": "461",
                        "voucherDate": "2016-06-01",
                        "approvalState": "已审批",
                        "confirmState": "已确认",
                        "closeState": "已关闭"
                    }
                ]
            });
        },
        
    }
};