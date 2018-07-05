import mirror, { actions, connect } from "mirrorx";
import UploadModel from './model';
import UploadComp from './components/Upload'

//注入Model
mirror.model(UploadModel);




export const Upload = connect((state) => state.upload)(UploadComp);
