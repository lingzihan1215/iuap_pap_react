import React from "react";
import { Route, Link } from "mirrorx";
import { userList } from "./user-manage/containers";
import PlanIndexProj from "./person-manage/containers";
const Routers = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/userlist`} component={userList} />
    <Route
      exact
      path={`${match.url}/person-manage`}
      component={PlanIndexProj}
    />
  </div>
);

export default Routers;
