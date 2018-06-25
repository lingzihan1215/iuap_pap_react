import React from 'react';
import mirror, { connect } from 'mirrorx';
import MultiTable from './components/example-edit-table';//多选table

import model from './model'

mirror.model(model);

export const ConnectedMultiTable = connect( state => state.editTable, null )(MultiTable);
