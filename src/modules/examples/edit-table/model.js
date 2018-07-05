/**
 * 计划申请业务Model
 */
import { actions } from "mirrorx";
import * as api from "./service";


export default {
  name: "editTable",
  initialState: {
    list: [],
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    factory:[]
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
    async getList(param, getState) {
      let { pageIndex, pageSize } = getState().editTable;
      let res=await api.getList({
        pageIndex: pageIndex - 1,
        pageSize
      });
      if(res){
        let { data: { detailMsg, success } } = res;
        if (success) {
          actions.editTable.updateState({ list: detailMsg.data.content, total: detailMsg.data.totalPages });
          return detailMsg.data.content;
        }
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

    async saveAll (data,getState){
      await api.saveList(getState().editTable.list);
    },
  }
};
