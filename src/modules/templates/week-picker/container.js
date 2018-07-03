import React from 'react';
import mirror, { connect } from 'mirrorx';
import WeekPicker from './components/WeekPicker';//多选table

import model from './model'

mirror.model(model);

export const ConnectedWeekPicker = connect( state => state.weekPicker, null )(WeekPicker);
