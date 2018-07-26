import React from 'react';
import mirror, { connect } from 'mirrorx';
import EditTable from './components/EditTable';//多选table

import model from './model'

if(!(model.name in mirror.actions)){    mirror.model(model);};

export const ConnectedEditTable = connect( state => state.editTable, null )(EditTable);
