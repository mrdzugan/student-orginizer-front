import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthContext from '../contexts/auth.context';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { userInfo } = useContext(AuthContext);
    return (
        <Route
            { ...rest }
            render={ props =>
                localStorage.getItem('accessToken') ? (
                    !userInfo.userLoading
                        ? <Component { ...props }/>
                        : <Spin indicator={ <LoadingOutlined style={ { fontSize: 28 } } spin/> }/>
                ) : (
                    <Redirect
                        to={ {
                            pathname: '/login',
                            state: { from: props.location }
                        } }
                    />
                )
            }
        />
    );
};

export default PrivateRoute;