import mirror, { actions, connect } from "mirrorx";
import DelModal from './components/DelModal'
import model from './model'

//注入Model
mirror.model(model);


export const CtDelModal = connect((state) => state.del)(DelModal);
