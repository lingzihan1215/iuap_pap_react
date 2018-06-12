import React from "react";
import { Route, Link } from "mirrorx";
import Contracts from "./contract-manage/containers/ContainersManage";

const Routers = ({ match }) => (
  <div>
    <Route path={`${match.url}/manage`} component={Contracts} />
  </div>
);
export default Routers;
