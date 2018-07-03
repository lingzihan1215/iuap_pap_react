/**
 * 计划申请业务Model
 */
import { actions } from "mirrorx";
import * as api from "./service";


export default {
  name: "weekPicker",
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
