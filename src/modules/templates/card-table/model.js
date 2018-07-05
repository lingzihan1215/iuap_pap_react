/**
 * 计划申请业务Model
 */
import { actions } from "mirrorx";
import * as api from "./service";


export default {
  name: "cardTable",
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
      let { pageIndex, pageSize } = getState().cardTable;
      let { data: { detailMsg, success } } = await api.getList({
        pageIndex: pageIndex - 1,
        pageSize
      });
      if (success) {
        actions.cardTable.updateState({ list: detailMsg.data.content, total: detailMsg.data.totalPages });
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
      actions.cardTable.updateState({
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
    },
    async saveAll (form,getState){
      let saveObj={
        ...form,
        tableList:getState().cardTable.list
      };
      await api.saveList(saveObj);
    },
  }
};
