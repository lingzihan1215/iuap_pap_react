
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
    async loadList(param, getState) {

    }
  }
};
