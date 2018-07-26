import React from 'react';
import mirror, { connect } from 'mirrorx';
import WeekPicker from './components/WeekPicker';//多选table

import model from './model'

if(!(model.name in mirror.actions)){    mirror.model(model);};

export const ConnectedWeekPicker = connect( state => state.weekPicker, null )(WeekPicker);
