import React from 'react';
import mirror, { connect } from 'mirrorx';
import TreeTable from './components/TreeTable';//多选table

import model from './model'

mirror.model(model);

export const ConnectedTreeTable = connect( state => state.tree, null )(TreeTable);
