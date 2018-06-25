import React from 'react';
import mirror, { connect } from 'mirrorx';
import Step from './components/example-step';//多选table

import model from './model'

mirror.model(model);

export const ConnectedStep = connect( state => state.editTable, null )(Step);
