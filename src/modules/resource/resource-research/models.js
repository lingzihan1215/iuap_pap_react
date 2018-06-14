/**
 * 资源调查表业务Model
 */
import { actions } from "mirrorx";
import * as api from "./services";


export default {
  name: "resource",
  initialState: {
    list: [],
    total: 0,
    pageIndex: 1,
    pageSize: 10
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
      let { pageIndex, pageSize } = getState().delivery;
      let { data: { detailMsg, success } } = await api.getList({
        pageIndex: pageIndex - 1,
        pageSize
      });
      if (success) {
        actions.resource.updateState({ list: detailMsg.data.content, total: detailMsg.data.totalPages });
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
    }
  }
};
