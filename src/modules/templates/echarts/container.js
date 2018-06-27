import React from 'react';
import mirror, { connect } from 'mirrorx';
import Bar from './components/bar/Bar';
import Line from './components/line/Line';
import Pie from './components/pie/Pie';
import BarLine from './components/bar-line/BarLine';

import model from './model'

mirror.model(model);

export const ConnectedBar = connect( state => state.echarts, null )(Bar);
export const ConnectedLine = connect( state => state.echarts, null )(Line);
export const ConnectedPie = connect( state => state.echarts, null )(Pie);
export const ConnectedBarLine = connect( state => state.echarts, null )(BarLine);
