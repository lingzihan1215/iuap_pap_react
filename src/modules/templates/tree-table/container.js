import React from 'react';
import mirror, { connect } from 'mirrorx';
import TreeTable from './components/TreeTable';//多选table

import model from './model'

if(!(model.name in mirror.actions)){    mirror.model(model);};

export const ConnectedTreeTable = connect( state => state.tree, null )(TreeTable);
