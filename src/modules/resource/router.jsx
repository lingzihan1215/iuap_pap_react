import React from "react";
import { Route, Link } from "mirrorx";
import { researchList } from "./resource-research/containers";
const Routers = ({ match }) => (
  <div>
    <Route
      exact
      path={`${match.url}/research`}
      component={researchList}
    />
  </div>
);

export default Routers;
