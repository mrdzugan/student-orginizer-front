import React from 'react';
import './App.css';
import AppLayout from './components/AppLayout';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import PrivateRoute from './helpers/PrivateRoute';
import TimeTable from './pages/TimeTable';
import MyGroup from './pages/MyGroup';

const App = () => {

    return <Switch>
        <Route exact path='/login'>
            <LoginPage/>
        </Route>
        <Route exact path='/register'>
            <RegisterPage/>
        </Route>
        <PrivateRoute exact path='/' component={() => <AppLayout>
            <h1>Main page</h1>
        </AppLayout>}/>
        <PrivateRoute exact path="/timetable" component={TimeTable}/>
        <PrivateRoute exact path="/mygroup" component={MyGroup}/>
    </Switch>;
};


export default App;
