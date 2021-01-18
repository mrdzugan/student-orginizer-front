import React, { useState, useContext } from 'react';
import './App.css';
import { Layout } from 'antd';
import Router from './components/router';
import Header from './components/Header';
import Sider from './components/Sider';
import Footer from './components/Footer';
import AuthContext from './contexts/auth.context';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

const { Content } = Layout;

const App = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const authValue = useContext(AuthContext);

    const AuthProvider = AuthContext.Provider;

    return <AuthProvider value={ authValue }>
        <Switch>
            <Route exact path='/login'>
                <LoginPage/>
            </Route>
            <Route exact path='/register'>
                <RegisterPage/>
            </Route>
            <Route path='/'>
                <Layout className='layout-container'>
                    <Sider setIsCollapsed={ setIsCollapsed }/>
                    <Layout>
                        <Header isCollapsed={ isCollapsed }/>
                        <Content style={ { margin: '24px 16px 0' } }>
                            <Router/>
                        </Content>
                        <Footer/>
                    </Layout>
                </Layout>
            </Route>
        </Switch>
    </AuthProvider>;
};


export default App;
