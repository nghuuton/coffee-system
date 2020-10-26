import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LayoutSystem from "./HOC/LayoutSystem";

function Routes() {
    return (
        <LayoutSystem>
            <Switch>
                <Route path="/" component={Home} />
            </Switch>
        </LayoutSystem>
    );
}

export default Routes;
