import React from 'react';
import mirror, { connect } from 'mirrorx';
import ComplexForm from './components/ComplexForm';//多选table

import model from './model'

mirror.model(model);

export const ConnectedComplexForm = connect( state => state.complex, null )(ComplexForm);
