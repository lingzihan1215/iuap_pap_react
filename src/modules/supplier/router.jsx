import React from "react";
import { Route, Link } from "mirrorx";
import {registerInfo,supplierList} from "./supplier-manage/containers";
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
  </div>
);

export default Routers;
