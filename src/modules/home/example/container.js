import React from 'react';
import mirror, { connect } from 'mirrorx';
import ExampleForm from './components/example-form/index';
import ExampleRoot from './components/example-root/index';

import model from './model'

mirror.model(model)

export default connect( state => state.example, null )(ExampleRoot)