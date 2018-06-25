import React from 'react';
import mirror, { connect } from 'mirrorx';

// 组件引入
import SimpleTable from './components/example-root/SimpleTable';
import SimpleSelectTable from './components/example-root/SimpleSelectTable';
import SimplePaginationTable from './components/example-root/SimplePaginationTable';

// 数据模型引入
import model from './model'
mirror.model(model);

// 数据和组件UI关联、绑定
export const ConnectedSimpleTable = connect( state => state.searchTable, null )(SimpleTable);
export const ConnectedSimpleSelectTable = connect( state => state.searchTable, null )(SimpleSelectTable);
export const ConnectedSimplePaginationTable = connect( state => state.searchTable, null )(SimplePaginationTable);
