import mirror, { actions, connect } from "mirrorx";
import UploadModel from './model';
// import asyncComponent from 'components/AsyncComponent';
import DelModal from './components/DelModal'
// const MasterTable = asyncComponent(() => import('./components/Master'));
//注入Model
mirror.model(UploadModel);




export const CtDelModal = connect((state) => state.del)(DelModal);
