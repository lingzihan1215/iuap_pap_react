import React from 'react'
import { Route } from 'mirrorx'


import {
    ConnectedBar,
    ConnectedLine,
    ConnectedPie,
    ConnectedBarLine,
    ConnectedRadar
} from './echarts/container';

import {
    ConnectedEditor
} from './editor/container'

import {
    ConnectedUpload
} from './upload/container.js'

import {
    ConnectedWeekPicker
} from './week-picker/container'

import {
    CtDelModal
} from './del-modal/container'

import {
    CtSearchPanel
} from './search-panel/container'

import {
    ConnectedEditTable
} from './edit-table/container'

import {
    CtFormValidate
} from './form-validate/container'

import {
    ConnectedRefTransfer,
    ConnectedRefMultiple,
} from './ref-example/container'

/**
 * 路由说明：
 * 1、echarts 图表示例
 *      bar:柱状图
 *      line:折线图
 *      pie:饼图
 *      bar-line:柱状折线图
 * 2、富文本编辑器示例
 * 3、编辑表格示例
 * 4、周选择示例
 * 5、删除确认弹窗示例
 * 6、查询面板示例
 * 7、form示例
 */
export default ({ match }) => (
    <div className="examples-route">
        <Route exact path={`${match.url}/bar`} component={ConnectedBar} />
        <Route exact path={`${match.url}/line`} component={ConnectedLine} />
        <Route exact path={`${match.url}/pie`} component={ConnectedPie} />
        <Route exact path={`${match.url}/bar-line`} component={ConnectedBarLine} />
        <Route exact path={`${match.url}/radar`} component={ConnectedRadar} />
        <Route exact path={`${match.url}/editor`} component={ConnectedEditor} />
        <Route exact path={`${match.url}/upload`} component={ConnectedUpload} />
        <Route exact path={`${match.url}/week-picker`} component={ConnectedWeekPicker} />
        <Route exact path={`${match.url}/del-modal`} component={CtDelModal} />
        <Route exact path={`${match.url}/search-panel`} component={CtSearchPanel} />
        <Route exact path={`${match.url}/edit-table`} component={ConnectedEditTable} />
        <Route exact path={`${match.url}/form-validate`} component={CtFormValidate} />
        <Route exact path={`${match.url}/ref-transfer-example`} component={ConnectedRefTransfer} />
        <Route exact path={`${match.url}/ref-multile-example`} component={ConnectedRefMultiple} />

    </div>
)