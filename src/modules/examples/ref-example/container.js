import React from 'react';
import mirror, { connect } from 'mirrorx';

import ExampleRef from './components/Ref';//多选table
import RefTransfer from './components1/index'
import RefMultiple from './components2/index'

import model from './model'

mirror.model(model);

// export const ConnectedRef = connect( state => state.ref, null )(ExampleRef);
export const ConnectedRefTransfer = connect( state => state.ref,null )(RefTransfer);
export const ConnectedRefMultiple = connect( state => state.ref,null )(RefMultiple);

