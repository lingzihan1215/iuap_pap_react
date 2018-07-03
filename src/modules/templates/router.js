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
    ConnectedBar,
    ConnectedLine,
    ConnectedPie,
    ConnectedBarLine,
    ConnectedRadar
} from './echarts/container';

import {
    ConnectedBpmTable,
    ConnectedBpmCard
} from './bpm/container';

import {
    ConnectedEditor
} from './editor/container'

import BPM from './bpm/components/BPM/Bpm'

import {
    Upload
} from './upload/container'

import {
    ConnectedEditTable
} from './edit-table/container'

import {
    ConnectedWeekPicker
} from './week-picker/container'
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
 * 8、echarts 图表示例
 *      bar:柱状图
 *      line:折线图
 *      pie:饼图
 *      bar-line:柱状折线图
 * 9、富文本编辑器示例
 * 10、编辑表格示例
 * 11、周选择示例
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
        <Route exact path={`${match.url}/bpm`} component={BPM} />
        <Route exact path={`${match.url}/bar`} component={ConnectedBar} />
        <Route exact path={`${match.url}/line`} component={ConnectedLine} />
        <Route exact path={`${match.url}/pie`} component={ConnectedPie} />
        <Route exact path={`${match.url}/bar-line`} component={ConnectedBarLine} />
        <Route exact path={`${match.url}/radar`} component={ConnectedRadar} />
        <Route exact path={`${match.url}/editor`} component={ConnectedEditor} />
        <Route exact path={`${match.url}/upload`} component={Upload} />
        <Route exact path={`${match.url}/edit-table`} component={ConnectedEditTable} />
        <Route exact path={`${match.url}/week-picker`} component={ConnectedWeekPicker} />
    </div>
)