import React from 'react'
import { Route } from 'mirrorx'

import {
    ConnectedSimpleTable,
    ConnectedSimpleSelectTable,
    ConnectedSimplePaginationTable,
    ConnectedExampleEdit
} from './search-table/container';

import {
    ConnectedCardTable
} from './card-table/container';

import {
    ConnectedComplexForm
} from './complex-form/container';

import {
    ConnectedMultiTable
} from './multi-table/container';

import {
    ConnectedRef
} from './ref-example/container';

import {
    ConnectedTreeTable
} from './tree-table/container';

import {
    ConnectedBpmTable,
    ConnectedBpmCard
} from './bpm/container';

import BPM from './bpm/components/BPM/Bpm'

/**
 * 路由说明：
 * 1、单表【search-table】：
 *      simple-table：form+最简单表格
 *      select-table：form+带多选的表格
 *      pagination-table：form+综合表格功能
 * 2、卡表【card-table】：
 * 3、主子表【multi-table】：
 * 4、树表【tree-table】：
 * 5、复杂信息表单【complex-form】：如供应商注册功能页面
 * 6、参照功能示例【ref-exmaple】：
 * 7、BPM 流程功能示例【bpm-table】：如督办任务功能页面
 */
export default ({ match }) => (
    <div className="templates-route">
        <Route exact path={`/`} component={ConnectedSimpleTable} />
        <Route exact path={`${match.url}/simple-table`} component={ConnectedSimpleTable} />
        <Route exact path={`${match.url}/select-table`} component={ConnectedSimpleSelectTable} />
        <Route exact path={`${match.url}/pagination-table`} component={ConnectedSimplePaginationTable} />
        <Route exact path={`${match.url}/example-edit`} component={ConnectedExampleEdit} />
        <Route exact path={`${match.url}/card-table`} component={ConnectedCardTable} />
        <Route exact path={`${match.url}/multi-table`} component={ConnectedMultiTable} />
        <Route exact path={`${match.url}/tree-table`} component={ConnectedTreeTable} />
        <Route exact path={`${match.url}/complex-form`} component={ConnectedComplexForm} />
        <Route exact path={`${match.url}/ref-exmaple`} component={ConnectedRef} />
        <Route exact path={`${match.url}/bpm-table`} component={ConnectedBpmTable} />
        <Route exact path={`${match.url}/bpm-card`} component={ConnectedBpmCard} />
    </div>
)