import React from "react";
import { Route, Link } from "mirrorx";
import { orderList, orderEdit } from "./order-manage/containers";
import { orderDeliveryList } from "./order-delivery/containers";
const Routers = ({ match }) => (
  <div>
    <Route exact path={match.url} render={() => <h3>请选择一个菜单</h3>} />
    <Route
      exact
      path={`${match.url}/edit`}
      component={orderEdit}
    />
    <Route
      exact
      path={`${match.url}/list`}
      component={orderList}
    />
    <Route
      exact
      path={`${match.url}/delivery`}
      component={orderDeliveryList}
    />
  </div>
);

export default Routers;
