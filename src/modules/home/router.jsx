import React from 'react'
import { Route } from 'mirrorx'

import Home from './dashboard'

export default (routesInfo) => {
    let url = routesInfo.match.url
    console.log(routesInfo)

    return (
        <div>
            <Route exact 
                path={`${url}/dashboard`}
                component={Home} />
        </div>
    )
}
