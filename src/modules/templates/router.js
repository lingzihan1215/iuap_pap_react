import React from 'react'
import { Route } from 'mirrorx'

import { ConnectedExampleRoot } from './search-table/container';

export default ({ match }) => (
    <div className="dashboard-route">
        <Route exact path={`${match.url}/example`} component={ConnectedExampleRoot} />
    </div>
)