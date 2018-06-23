import React from 'react'
import { Route } from 'mirrorx'

import Dashboard from './dashboard/container';
import { ConnectedExampleRoot, ConnectedSelectTable, ConnectedEditTable, ConnectedExamplePaginationTable } from './example/container';

export default ({ match }) => (
    <div className="dashboard-route">
        <Route exact path={`${match.url}/dashboard`} component={Dashboard} />
        <Route exact path={`${match.url}/example`} component={ConnectedExampleRoot} />
        <Route exact path={`${match.url}/example-edit`} component={ConnectedSelectTable} />
        <Route exact path={`${match.url}/example-select`} component={ConnectedEditTable} />
        <Route exact path={`${match.url}/pagination-table`} component={ConnectedExamplePaginationTable} />
    </div>
)