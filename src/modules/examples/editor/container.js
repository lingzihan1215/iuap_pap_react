import React from 'react';
import mirror, { connect } from 'mirrorx';
import Editor from './components/Editor';//多选table

import model from './model'

if(!(model.name in mirror.actions)){    mirror.model(model);};

export const ConnectedEditor = connect( state => state.editor, null )(Editor);
