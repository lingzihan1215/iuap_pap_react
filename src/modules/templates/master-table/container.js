import React from 'react';
import mirror, { connect } from 'mirrorx';

// 组件引入
import MasterTable from './components/MasterTable';
import MasterForm from './components/MasterForm';
import ChildTable from './components/ChildTable'

// 数据模型引入
import model from './model'
mirror.model(model);

// 数据和组件UI关联、绑定
export const ConnectedMasterTable = connect( state => state.mastertable, null )(MasterTable);
export const ConnectedMasterForm = connect( state => state.mastertable, null )(MasterForm);
// export const ConnectedChildTable = connect( state => state.mastertable, null )(ChildTable);