import React from 'react';
import mirror, { connect } from 'mirrorx';

// 组件引入
import SimpleTable from './components/example-root/SimpleTable';
import SimpleSelectTable from './components/example-root/SimpleSelectTable';
import SimplePaginationTable from './components/example-root/SimplePaginationTable';
import ExampleEdit from './components/example-edit/Edit';
import ExampleBpmChart from './components/example-bpm-chart'

// 数据模型引入
import model from './model'
mirror.model(model);

// 数据和组件UI关联、绑定
export const ConnectedSimpleTable = connect( state => state.searchTable, null )(SimpleTable);
export const ConnectedSimpleSelectTable = connect( state => state.searchTable, null )(SimpleSelectTable);
export const ConnectedSimplePaginationTable = connect( state => state.searchTable, null )(SimplePaginationTable);
export const ConnectedExampleEdit = connect( state => state.searchTable, null )(ExampleEdit);
export const ConnectedExampleBpmChart = connect( state => state.searchTable, null )(ExampleBpmChart);
