import React from 'react'
import mirror, { connect } from 'mirrorx';

import SalesNotice from './components/SalesNotice'

import model from './model'
if(!(model.name in mirror.actions)){    mirror.model(model);}

const ConnectedSalesNotice = connect(state => state.salesNotice, null)(SalesNotice)
export default ConnectedSalesNotice