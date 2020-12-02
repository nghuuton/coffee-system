import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Menu from "./components/Menu";
import LayoutSystem from "./HOC/LayoutSystem";

function Routes() {
    return (
        <LayoutSystem>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/menu" exact component={Menu} />
            </Switch>
        </LayoutSystem>
    );
}

export default Routes;
