import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Auth from "./HOC/auth";
import DashBoard from "./pages/Dashboard";

function Routes() {
    return (
        <Switch>
            <Redirect exact from="/" to="/coffee" />

            <Route path="/coffee" component={DashBoard} />
            <Route path="/login" exact component={Auth(Login, false)} />
        </Switch>
    );
}

export default Routes;
