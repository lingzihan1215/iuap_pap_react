import React from "react";
import { Route, Link } from "mirrorx";
import {RegisterInfo} from "./supplier-manage/containers";
const Routers = ({ match }) => (
  <div>
    <Route exact path={match.url} render={() => <h3>请选择一个菜单</h3>} />
    <Route
      exact
      path={`${match.url}/supplier/manage`}
      component={RegisterInfo}
    />
  </div>
);

export default Routers;
