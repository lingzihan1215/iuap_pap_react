import React from "react";
import { Route, Link } from "mirrorx";
import {registerInfo,supplierList,supplierDetail} from "./supplier-manage/containers";
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
