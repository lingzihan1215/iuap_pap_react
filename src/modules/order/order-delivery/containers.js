/**
 * 送货单业务容器组件
 */

import mirror, { actions, connect } from "mirrorx";
import List from './components/List';
import model from './models'

//注入Model
mirror.model(model);

export const orderDeliveryList = connect((state) => state.order)(List);
