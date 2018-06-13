/**
 * 送货单业务Model
 */
import { actions } from "mirrorx";
import * as api from "./services";


export default {
  name: "delivery",
  initialState: {
    list: [],
    total: 0,
    activePage: 1,
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
      let { activePage, pageSize } = getState().delivery;
      let { data: { data, success, total } } = await api.getList({
        activePage,
        pageSize
      });
      if (success) {
        actions.delivery.updateState({ list: data, total });
        return data;
      }
    },
    async removeList(id, getState) {
      let result = await api.deleteList({
        id
      });
      return result;
    },
    async saveList(form, getState) {
      let result = await api.saveList(form);
      return result;
    }
  }
};
