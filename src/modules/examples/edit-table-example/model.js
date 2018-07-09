/**
 * 计划申请业务Model
 */
import { actions } from "mirrorx";
import * as api from "./service";


export default {
  name: "editTable2",
  initialState: {
    list: []
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
      async loadList(){
        actions.editTable2.updateState({
          list:[{
            "key": "10",
            "index": "10",
            "orderCode": "0000",
            "supplier": "10080",
            "supplierName": "山东吉华重工",
            "type": "NB",
            "purchasing": "1300",
            "purchasingGroup": "460",
            "voucherDate": "2016-06-01",
            "approvalState": "已审批",
            "confirmState": "已确认",
            "closeState": "已关闭",
            "del":false
          },{
            "key": "10",
            "index": "10",
            "orderCode": "0000",
            "supplier": "10080",
            "supplierName": "山东吉华重工",
            "type": "NB",
            "purchasing": "1300",
            "purchasingGroup": "460",
            "voucherDate": "2016-06-01",
            "approvalState": "已审批",
            "confirmState": "已确认",
            "closeState": "已关闭",
            "del":false
          }]
        })
      }
  }
};
