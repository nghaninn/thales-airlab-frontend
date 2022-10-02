import React from "react"
import { Route, Switch } from "react-router-dom"
// import { PrivateRoute } from "./PrivateRoute"

import Error404 from "../components/Page-Error-404"
import Home from "../components/Page-Home"

const RoutePath = () => {
    return (
        <Switch>
            {/* <PrivateRoute path={path("availability")} component={Availability} /> */}
            <Route path={'/'} component={Home} />
            <Route component={Error404} />
        </Switch>
    )
}

export default RoutePath