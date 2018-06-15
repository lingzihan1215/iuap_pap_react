import React from "react";
import { Route, Link } from "mirrorx";

import { roleList,roleEdit } from "./role-manage/containers";
import PlanIndexProj from "./person-manage/containers";

const Routers = ({ match }) => (
  <div>
    <Route exact path={`${match.url}/rolelist`} component={roleList} />
    <Route exact path={`${match.url}/roleedit`} component={roleEdit} />
    <Route
      exact
      path={`${match.url}/person-manage`}
      component={PlanIndexProj}
    />
  </div>
);

export default Routers;
