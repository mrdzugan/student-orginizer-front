import React, { useContext } from 'react';
import TimeTable from '../pages/TimeTable';
import AuthContext from '../contexts/auth.context';
import { Switch, Route, useHistory } from 'react-router-dom';

const Router = () => {
    const { isLogged } = useContext(AuthContext);

    const history = useHistory();
    if (!isLogged) {
        history.push('/login');
    }
    return (
        <>
            <Switch>
                <Route exact path="/timetable">
                    <TimeTable/>
                </Route>
            </Switch>
        </>
    );
};

export default Router;