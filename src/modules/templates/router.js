import React from 'react'
import { Route } from 'mirrorx'

import { 
    ConnectedSimpleTable, 
    ConnectedSimpleSelectTable,
    ConnectedSimplePaginationTable
} from './search-table/container';

/**
 * 路由说明：
 * 1、单表：三个示例【form+最简单表格、form+带多选的表格、form+综合表格功能】
 */
export default ({ match }) => (
    <div className="templates-route">
        <Route exact path={`${match.url}/simple-table`} component={ConnectedSimpleTable} />
        <Route exact path={`${match.url}/select-table`} component={ConnectedSimpleSelectTable} />
        <Route exact path={`${match.url}/pagination-table`} component={ConnectedSimplePaginationTable} />
    </div>
)