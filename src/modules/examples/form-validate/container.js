import mirror, { actions, connect } from "mirrorx";

import AsyncLoad from 'components/AsyncLoad';

const FormValidate = AsyncLoad(()=>import('./components/FormValidate'));

import model from './model'

//注入Model
mirror.model(model);


export const CtFormValidate = connect((state) => state.form)(FormValidate);
