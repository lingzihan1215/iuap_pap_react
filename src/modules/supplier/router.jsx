import React from "react";
import { Route, Link } from "mirrorx";

import { registerInfo } from "./supplier-manage/containers";
import { supplierList } from "./supplier-list/containers";
import { supplierDetail } from "./supplier-detail/containers";

const Routers = ({ match }) => (
  <div>
    <Route
      exact
      path={`${match.url}/register`}
      component={registerInfo}
    />
    <Route
      exact
      path={`${match.url}/list`}
      component={supplierList}
    />
    <Route
      exact
      path={`${match.url}/detail`}
      component={supplierDetail}
    />
  </div>
);

export default Routers;
