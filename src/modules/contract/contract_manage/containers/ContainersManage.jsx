import mirror, { actions, connect } from "mirrorx";
import Contracts from "../components/contract/Contract";
import containers from "../models";
//注入Model
mirror.model(containers);
export default connect(state => state.containers)(Contracts);
