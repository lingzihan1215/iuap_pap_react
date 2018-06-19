import React from 'react'
import { Route } from 'mirrorx'

import Dashboard from './dashboard/container'

export default ({ match }) => (
    <div className="dashboard-route">
        <Route exact path={`${match.url}/dashboard`} component={Dashboard} />
    </div>
)