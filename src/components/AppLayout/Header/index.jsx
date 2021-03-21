import React, { useState } from 'react';
import logo from '../../images/logo.svg';
import styles from './styles.module.css';
import { Button, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import authService from '../../../services/auth.service';
import CreateGroupModal from '../../CreateGroupModal';
import AuthService from '../../../services/auth.service';

const getUserRole = (roles) => {
    if (roles.includes('ROLE_CURATOR')) {
        return 'Куратор';
    }
    if (roles.includes('ROLE_HEADMAN')) {
        return 'Староста';
    }
    if (roles.includes('ROLE_STUDENT')) {
        return 'Студент(ка)';
    }
    return 'Не визначено';
};

const Header = (props) => {
    const { isCollapsed } = props;

    const [isCreateGroupModalVisible, setIsCreateGroupModalVisible] = useState(false);
    const userInfo = AuthService.getCurrentUser();

    const renderCreateGroupButton = () =>
        <Button
            size="small"
            shape="round"
            type="primary"
            className={ styles.createGroupButton }
            onClick={ () => setIsCreateGroupModalVisible(true) }
        >Створити групу</Button>;

    const groupInfo = userInfo.group
        ? `${ userInfo.faculty?.abbreviation }-${ userInfo.group.name } ${ getUserRole(userInfo.roles) }`
        : renderCreateGroupButton();

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
            <div
                className={ styles.userInfo }
                style={ { height: userInfo.group !== 'noGroup' ? '26px' : '36px' } }
            >
                <span>{ userInfo.name } { userInfo.surname }</span>
                <div>{ groupInfo }</div>
            </div>
            <Button size='small' ghost onClick={ () => authService.logout() }>Logout</Button>
        </div>
        <CreateGroupModal
            visible={ isCreateGroupModalVisible }
            onFinish={ () => setIsCreateGroupModalVisible(false) }
        />
    </Layout.Header>;
};

export default Header;