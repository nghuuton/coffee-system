import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Menu from "../Menu";
import Auth from "../../HOC/auth";
import Home from "../Home";
import LayoutSystem from "../../HOC/LayoutSystem";

function DashBoard() {
    const match = useRouteMatch();
    return (
        <LayoutSystem>
            <Switch>
                <Route path={match.url} component={Auth(Home, true)} exact />
                <Route path={`${match.url}/menu`} component={Auth(Menu, true)} />
            </Switch>
        </LayoutSystem>
    );
}

export default DashBoard;
