import React from "react";
import { Route, Link } from "mirrorx";
import { tenantList,tenantDetail } from "./tenant-manage/containers";
import { interList,interDetail } from "./inter-manage/containers";

const Routers = ({ match }) => (
  <div>
    <Route
      exact
      path={`${match.url}/tenantlist`}  //租户列表url
      component={tenantList}
    />
    <Route
      exact
      path={`${match.url}/tenantdetail`}  //租户详情url
      component={tenantDetail}
    />

    <Route
      exact
      path={`${match.url}/interlist`}   //接口列表url
      component={interList}
    />
    <Route
      exact
      path={`${match.url}/interdetail`}  //接口详情url
      component={interDetail}
    />
    
  </div>
);

export default Routers;
