import React from 'react';
import mirror, { connect } from 'mirrorx'
import ExampleRoot from './components/example-root'

import model from './model'
mirror.model(model)

export default connect( state => state.example, null )(ExampleRoot)