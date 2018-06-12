import React from "react";
import { Route, Link } from "mirrorx";
import Contracts from "./contract_manage/containers/ContainersManage";

const Routers = ({ match }) => (
  <div>
    <Route exact path={match.url} render={() => <h3>请选择一个菜单</h3>} />
    <Route path={`${match.url}/manage`} component={Contracts} />
  </div>
);
export default Routers;
