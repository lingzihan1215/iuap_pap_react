import { actions } from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service"; 
// 接口返回数据公共处理方法，根据具体需要
import { processData } from "utils"; 

export default {
    // 确定 Store 中的数据模型作用域
    name: "tree", 
    // 设置当前 Model 所需的初始化 state
    initialState: {  
        treeData:[],
        showLoading:false,
        list: [],
        pageIndex:1,
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
      /**
       * 获得树的数据
       * @param {*} param 
       * @param {*} getState 
       */
        async getTreeData(param,getState){
            actions.tree.updateState({
                treeData: [{
                    title: '0-0',
                    key: '0-0',
                    children: [{
                      title: '0-0-0',
                      key: '0-0-0',
                      children: [
                        { title: '0-0-0-0', key: '0-0-0-0' },
                        { title: '0-0-0-1', key: '0-0-0-1' },
                        { title: '0-0-0-2', key: '0-0-0-2' },
                      ],
                    }, {
                      title: '0-0-1',
                      key: '0-0-1',
                      children: [
                        { title: '0-0-1-0', key: '0-0-1-0' },
                        { title: '0-0-1-1', key: '0-0-1-1' },
                        { title: '0-0-1-2', key: '0-0-1-2' },
                      ],
                    }, {
                      title: '0-0-2',
                      key: '0-0-2',
                    }],
                  }, {
                    title: '0-1',
                    key: '0-1',
                    children: [
                      { title: '0-1-0-0', key: '0-1-0-0' },
                      { title: '0-1-0-1', key: '0-1-0-1' },
                      { title: '0-1-0-2', key: '0-1-0-2' },
                    ],
                  }, {
                    title: '0-2',
                    key: '0-2',
                  }]
            })
        },
        /**
         * 获得表格数据
         * @param {*} param 
         * @param {*} getState 
         */
        async getTableData(param,getState){
          actions.tree.updateState({
            list:[
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
            }, {
                "key": "12",
                "index": "12",
                "orderCode": "0002"+param,
                "supplier": "10082",
                "supplierName": "山东吉华重工",
                "type": "NB",
                "purchasing": "1302",
                "purchasingGroup": "462",
                "voucherDate": "2016-06-02",
                "approvalState": "已审批",
                "confirmState": "已确认",
                "closeState": "已关闭"
            }
            ]
          })
        }
    }
};