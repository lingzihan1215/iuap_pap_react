import mirror, { actions, connect } from "mirrorx";
import UploadComp from './components/Upload'

import UploadModel from './model';
mirror.model(UploadModel);

export const ConnectedUpload = connect((state) => state.upload)(UploadComp);
