import React, { Component } from "react";
import { actions } from "mirrorx";
import * as api from "../services/PlanIndexProj";
import moment from "moment";

export default {
  name: "PlanIndexProj",
  initialState: {
    treeData: []
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
    getTree(){
      api.get_tree()
    }
  }
};
