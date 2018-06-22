import React from 'react';
import mirror, { connect } from 'mirrorx';
import Root from './components/example-root/index';
import Edit from './components/example-edit/index';

import model from './model'

mirror.model(model)

export const ExampleRoot = connect( state => state.example, null )(Root);
export const ExampleEdit = connect( state => state.example, null )(Edit);