import React from 'react';
import mirror, { connect } from 'mirrorx';
import EditTable from './components/example-edit-table';//多选table

import model from './model'

mirror.model(model);

export const ConnectedEditTable = connect( state => state.editTable, null )(EditTable);
