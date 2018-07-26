import mirror, { actions, connect } from "mirrorx";

import AsyncLoad from 'components/AsyncLoad';

const FormValidate = AsyncLoad(()=>import('./components/FormValidate'));

import model from './model'

//注入Model
if(!(model.name in mirror.actions)){    mirror.model(model);};


export const CtFormValidate = connect((state) => state.form)(FormValidate);
