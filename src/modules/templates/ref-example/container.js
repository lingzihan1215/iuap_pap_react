import React from 'react';
import mirror, { connect } from 'mirrorx';
import Ref from './components/example-ref-table';//多选table

import model from './model'

mirror.model(model);

export const ConnectedRef = connect( state => state.editTable, null )(Ref);
