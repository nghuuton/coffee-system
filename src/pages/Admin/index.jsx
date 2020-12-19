import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Auth from "../../HOC/auth";
import LayoutSystemAdmin from "../../HOC/LayoutSystemAdmin";
import AdminDashboard from "../Admin_Dashboard";
import AdminMenu from "../Menu_Admin";
import AdminStore from "../Store_Admin";
import AdminUser from "../User_Admin";

function AdminRoute() {
    const match = useRouteMatch();
    return (
        <LayoutSystemAdmin>
            <Switch>
                <Route path={match.url} component={Auth(AdminDashboard, true)} exact />
                <Route path={`${match.url}/menu`} component={Auth(AdminMenu, true)} />
                <Route path={`${match.url}/store`} component={Auth(AdminStore, true)} />
                <Route path={`${match.url}/user`} component={Auth(AdminUser, true)} />
            </Switch>
        </LayoutSystemAdmin>
    );
}

export default AdminRoute;
