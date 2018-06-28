/*主子表容器 */
import React, { Component } from "react";
import mirror, { actions, connect } from "mirrorx";
import MasterModel from './model';
import asyncComponent from 'components/AsyncComponent';
import TableWrapper from './components/TableWrapper';
import BpmCard from './components/BpmCard';
import BPM from './components/BPM'
const MasterTable = asyncComponent(() => import('./components/Master'));
//注入Model
mirror.model(MasterModel);

//全局HOOK函数

/* mirror.hook((action, getState) => {
  const { routing: { location } } = getState();
  if (action.type === "@@router/LOCATION_CHANGE" && location.pathname === '/templates/bpm-table') {
    console.log("执行load方法");
    actions.master.load();
  }
}); */




export const ConnectedBpmTable = connect((state) => state.master)(MasterTable);
export const ConnectedBpmCard= connect((state) => state.master)(BpmCard);
