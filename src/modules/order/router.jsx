import React from "react";
import { Route, Link } from "mirrorx";
import { orderList, orderDetail } from "./order-manage/containers";
import { orderDeliveryList } from "./order-delivery/containers";
const Routers = ({ match }) => (
  <div>
    <Route
      exact
      path={`${match.url}/detail`}
      component={orderDetail}
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
