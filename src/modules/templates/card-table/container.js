import React from 'react';
import mirror, { connect } from 'mirrorx';
import CardTable from './components/CardTable';//多选table

import model from './model'

if(!(model.name in mirror.actions)){    mirror.model(model);};

export const ConnectedCardTable = connect( state => state.cardTable, null )(CardTable);
