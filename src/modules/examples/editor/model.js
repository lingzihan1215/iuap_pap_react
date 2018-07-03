/**
 * 计划申请业务Model
 */
import { actions } from "mirrorx";
import * as api from "./service";


export default {
  name: "editor",
  initialState: {
    
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

  }
};
