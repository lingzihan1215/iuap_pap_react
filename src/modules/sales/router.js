import React from 'react'
import { Route } from 'mirrorx'

import ConnectedSalesNotice from './sales-notice/container'

export default ({ match }) => (
    <div className="sales-notice">
        <Route exact path={`${match.url}/sales-notice`} component={ConnectedSalesNotice} />
    </div>
)
