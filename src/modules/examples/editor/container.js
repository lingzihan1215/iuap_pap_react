import React from 'react';
import mirror, { connect } from 'mirrorx';
import Editor from './components/Editor';//多选table

import model from './model'

mirror.model(model);

export const ConnectedEditor = connect( state => state.editor, null )(Editor);
