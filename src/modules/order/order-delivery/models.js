/**
 * 送货单业务Model
 */
import { actions } from "mirrorx";
import * as api from "./services";


export default {
  name: "delivery",
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
    async getList(param, getState) {
      let { data: { data, success } } = await api.getList();
      if (success) {
        actions.delivery.updateState({ list: data });
        return data;
      }
    }
  }
};
