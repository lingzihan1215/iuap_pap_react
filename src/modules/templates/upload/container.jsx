import mirror, { actions, connect } from "mirrorx";
import UploadModel from './model';
// import asyncComponent from 'components/AsyncComponent';
import UploadComp from './components/upload'
// const MasterTable = asyncComponent(() => import('./components/Master'));
//注入Model
mirror.model(UploadModel);




export const Upload = connect((state) => state.upload)(UploadComp);
