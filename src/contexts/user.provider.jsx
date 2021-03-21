import React, { useState, useEffect } from 'react';
import AuthContext from './auth.context';
import UserService from '../services/user.service';
import * as _ from 'lodash';

const UserProvider = (props) => {
    const [userInfo, setUserInfo] = useState({ userLoading: true });
    console.log(userInfo);
    useEffect(() => {
        const getUser = async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const { data: { user } } = await UserService.getUser(userId);
                assignUserInfo(user);
            }
        };
        getUser();
        // eslint-disable-next-line
    }, []);

    const logout = () => {
        setUserInfo({});
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        window.location.href = '/';
    };

    const assignUserInfo = values => {
        values.userLoading = false;
        if (!values.id) {
            values.id = values._id;
        }
        setUserInfo(prevValue => _.omit({ ...prevValue, ...values }, ['password', '_v']));
    };
    return <AuthContext.Provider value={ { userInfo, logout, setUserInfo: assignUserInfo } }>
        { props.children }
    </AuthContext.Provider>;

};

export default UserProvider;