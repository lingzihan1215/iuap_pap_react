import React from 'react';
import mirror, { connect } from 'mirrorx';
import ExampleForm from './components/example-form/index';
import ExampleRoot from './components/example-root/index';

import model from './model'

mirror.model(model)

connect( state => state.example, null )(ExampleForm);
export default connect( state => state.example, null )(ExampleRoot)