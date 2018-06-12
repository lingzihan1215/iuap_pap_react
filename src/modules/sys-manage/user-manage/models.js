
import { actions } from "mirrorx";
import * as api from "./services";
import { processData } from "utils";


export default {
  name: "user",
  initialState: {
    list: [],
    orderTypes:[],
    pageActive:1,
    pageSize:10,
    totalPages:1,
    detail:{}
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
    async loadList(param, getState) {//加载数据
      
    }
  }
};
