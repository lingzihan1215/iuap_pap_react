import React from "react";
import { Route, Link } from "mirrorx";
import { userList } from "./user-manage/containers";
const Routers = ({ match }) => (
  <div>
    <Route
      exact
      path={`${match.url}/list`}
      component={userList}
    />
  </div>
);

export default Routers;
