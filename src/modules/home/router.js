import React from 'react'
import { Route } from 'mirrorx'

import Dashboard from './dashboard/container';
import ExampleRoot from './example/container';


export default ({ match }) => (
    <div className="dashboard-route">
        <Route exact path={`${match.url}/dashboard`} component={Dashboard} />
        <Route exact path={`${match.url}/example`} component={ExampleRoot} />
        <Route exact path={`${match.url}/exampleedit`} component={ExampleRoot} />
    </div>
)