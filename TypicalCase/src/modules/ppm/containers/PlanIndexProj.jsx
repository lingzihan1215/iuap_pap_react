/**
 * 业务容器组件
 */

import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import PlanIndexProj from "../components/PlanIndexProj";
import PlanIndexProjModel from "../models/PlanIndexProj";

//注入Model
mirror.model(PlanIndexProjModel);

//全局HOOK函数
mirror.hook((action, getState) => {
  const {
    routing: { location }
  } = getState();
  if (
    action.type === "@@router/LOCATION_CHANGE" &&
    location.pathname === "/ppm/PlanIndexProj"
  ) {
    actions.PlanIndexProj.get_tree_data(getState().PlanIndexProj.treeData);
  }
});

export default connect(state => state.PlanIndexProj)(PlanIndexProj);
