import React, { Component } from "react";
import { actions } from "mirrorx";
import * as api from "./services";
import * as tips from "utils/index";
export default {
  name: "containers",
  initialState: {},
  reducers: {
    save(state, data) {
      return {
        ...state,
        ...data
      };
    }
  },
  effects: {}
};
