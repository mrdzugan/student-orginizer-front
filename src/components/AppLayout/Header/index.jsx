import React from 'react';
import logo from '../../images/logo.svg';
import styles from './styles.module.css';
import { Button, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import authService from '../../../services/auth.service';

const Header = (props) => {
    const { isCollapsed } = props;

    const userInfo = JSON.parse(localStorage.getItem('user'));

    return <Layout.Header
        className={ styles.headerContainer }
        style={ { padding: 0, justifyContent: isCollapsed ? 'space-between' : 'flex-end' } }>
        { isCollapsed && <div className={ styles.logo }>
            <div className={ styles.picture }>
                <img src={ logo } width='40' alt=''/>
            </div>
        </div> }
        <div className={ styles.userInfoContainer }>
            <UserOutlined/>
            <div className={ styles.userInfo }>
                <span>{ userInfo.name } { userInfo.surname }</span>
                <span>{ userInfo.faculty?.abbreviation }-127 Студент</span>
            </div>
            <Button size='small' ghost onClick={ () => authService.logout() }>Logout</Button>
        </div>

    </Layout.Header>;
};

export default Header;