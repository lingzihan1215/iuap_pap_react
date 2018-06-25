import React from 'react';
import mirror, { connect } from 'mirrorx';
import ExampleRef from './components/ExampleRef';//多选table

import model from './model'

mirror.model(model);

export const ConnectedRef = connect( state => state.ref, null )(ExampleRef);
