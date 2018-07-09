import React from 'react';
import mirror, { connect } from 'mirrorx';
import EditTable from './components';//多选table

import model from './model'

mirror.model(model);

export const ConnectedEditTable2 = connect( state => state.editTable2, null )(EditTable);
