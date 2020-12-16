import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Auth from "./HOC/auth";
import AdminRoute from "./pages/Admin";
import DashBoard from "./pages/Dashboard";
import KitChen from "./pages/Kitchen";
import Login from "./pages/Login";

function Routes() {
    return (
        <Switch>
            <Redirect exact from="/" to="/coffee" />

            <Route path="/coffee" component={DashBoard} />
            <Route path="/login" exact component={Auth(Login, false)} />
            <Route path="/kitchen" exact component={Auth(KitChen, true)} />
            <Route path="/admin" component={AdminRoute} />
        </Switch>
    );
}

export default Routes;
