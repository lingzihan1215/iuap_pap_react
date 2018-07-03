import mirror, { actions, connect } from "mirrorx";
import SearchPanel from './components/SearchPanel'
import model from './model'

//注入Model
mirror.model(model);


export const CtSearchPanel = connect((state) => state.searchPanel)(SearchPanel);
