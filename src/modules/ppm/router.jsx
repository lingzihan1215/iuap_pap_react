import React from "react";
import { Route, Link } from "mirrorx";
import PlanIndexProj from "./person-manage/containers/PersonManage";

const Routers = ({ match }) => (
  <div>
    <Route
      path={`${match.url}/PlanIndexProj`}
      component={PlanIndexProj}
    />
  </div>
);
export default Routers;
