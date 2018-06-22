import React from 'react';
import mirror, { connect } from 'mirrorx';
import ExampleForm from './components/example-form';
import ExampleRoot from './components/example-root';
import SelectTable from './components/example-select-table';//多选table
import EditTable from './components/example-edit-table';//可编辑table

import model from './model'

mirror.model(model);

export const ConnectedExampleRoot = connect( state => state.example, null )(ExampleRoot);
export const ConnectedSelectTable = connect( state => state.example, null )(SelectTable);
export const ConnectedEditTable = connect( state => state.example, null )(EditTable);
