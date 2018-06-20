import React from 'react'
// 导入
// 解构赋值
import { Route } from 'mirrorx'

import conectedLoadComponent from './manage-page1/container';
import { orderList } from './order-manage/containers';

// /manage/manage-page -> ManagePage

export default ({ match }) => (
    <div>
        <Route exact path={`${match.url}/manage-page`} component={conectedLoadComponent} />
        <Route exact path={`${match.url}/order-list`} component={orderList} />
    </div>
)