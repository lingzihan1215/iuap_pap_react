import React from 'react'
import mirror, { connect } from 'mirrorx';

import SalesNotice from './components/SalesNotice'

import model from './model'
mirror.model(model)

const ConnectedSalesNotice = connect(state => state.salesNotice, null)(SalesNotice)
export default ConnectedSalesNotice