/**
 * 业务容器组件
 */
import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import PlanIndexProj from "./components/person-manage";
import PlanIndexProjModel from "./models";
//注入Model
mirror.model(PlanIndexProjModel);
export default connect(state => state.PlanIndexProj)(PlanIndexProj);
