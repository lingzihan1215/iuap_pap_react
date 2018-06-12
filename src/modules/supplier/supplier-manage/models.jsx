
import { actions } from "mirrorx";
import * as api from "./services";
import { processData } from "utils";


export default {
  name: "suppliermanager",
  initialState: {

  },
  reducers: {
    save(state, data) {
      return {
        ...state,
        ...data
      };
    }
  },

  effects: {
    async load(param, getState) {//加载数据
      
    },
  }


};
