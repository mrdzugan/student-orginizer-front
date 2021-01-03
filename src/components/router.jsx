import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "../pages/Auth";
import TimeTable from "../pages/TimeTable";

const Router = () => {
    return (
        <Switch>
            <Route exact path='/'>
                <AuthPage/>
            </Route>
            <Route exact path="/timetable">
                <TimeTable/>
            </Route>
        </Switch>
    );
};

export default Router;