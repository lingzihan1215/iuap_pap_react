import React from 'react';
import mirror, { connect } from 'mirrorx'
import Board from './components/board'

import model from './model'

mirror.model(model)

export default connect( state => state.dashboard, null )(Board)