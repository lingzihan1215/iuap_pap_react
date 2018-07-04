import mirror, { actions, connect } from "mirrorx";
import FormValidate from './components/FormValidate'
import model from './model'

//注入Model
mirror.model(model);


export const CtFormValidate = connect((state) => state.form)(FormValidate);
