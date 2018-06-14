import React from "react";
import { Route, Link } from "mirrorx";
import { planApplyList } from "./plan-apply/containers";
const Routers = ({ match }) => (
  <div>
    <Route
      exact
      path={`${match.url}/planapply`}
      component={planApplyList}
    />
  </div>
);

export default Routers;
