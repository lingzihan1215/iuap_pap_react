import React from 'react';
import mirror, { connect } from 'mirrorx';
import MultiTable from './components/MultiTable';//多选table

import model from './model'

if(!(model.name in mirror.actions)){    mirror.model(model);};

export const ConnectedMultiTable = connect(state => state.multi, null)(MultiTable);
