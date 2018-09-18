import React from "react";
import { Route, Link } from "mirrorx";
import { tenantList } from "./tenant-manage/containers";
import { interList } from "./inter-manage/containers";

const Routers = ({ match }) => (
  <div>
    <Route
      exact
      path={`${match.url}/manage`}
      component={tenantList}
    />
    <Route
      exact
      path={`${match.url}/inter`}
      component={interList}
    />
  </div>
);

export default Routers;
