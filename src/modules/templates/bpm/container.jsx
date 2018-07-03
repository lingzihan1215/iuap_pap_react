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

export const ConnectedBpmTable = connect((state) => state.master)(MasterTable);
export const ConnectedBpmCard= connect((state) => state.master)(BpmCard);
