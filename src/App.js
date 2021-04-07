import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import PrivateRoute from './helpers/PrivateRoute';
import TimeTable from './pages/TimeTable';
import MyGroup from './pages/MyGroup';
import UserProvider from './contexts/user.provider';
import Advertisements from './pages/Advertisements';

const App = () => {
    return <UserProvider>
        <Switch>
            <Route exact path='/login'>
                <LoginPage/>
            </Route>
            <Route exact path='/register'>
                <RegisterPage/>
            </Route>
            <PrivateRoute exact path='/' component={ Advertisements }/>
            <PrivateRoute exact path="/timetable" component={ TimeTable }/>
            <PrivateRoute exact path="/mygroup" component={ MyGroup }/>
        </Switch>
    </UserProvider>;
};


export default App;
