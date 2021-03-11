import React from "react";
import logo from "../../images/logo.svg";
import styles from "./styles.module.css";
import { Layout, Menu } from "antd";
import { NotificationOutlined, ScheduleOutlined, TeamOutlined } from "@ant-design/icons";
import { useHistory } from 'react-router-dom';

const Sider = (props) => {
    const { setIsCollapsed } = props;

    const history = useHistory();

    const keysMap = {
        '/': 'Ads',
        '/timetable': 'Schedule',
        '/mygroup': 'MyGroup'
    }

    const onMenuClickHandle = ({ key }) => {
        switch(key){
            case 'Ads':
                history.push('/');
                break;
            case 'Schedule':
                history.push('/timetable');
                break;
            case 'MyGroup':
                history.push('/mygroup');
                break;
            default: break;
        }
    }

    return <Layout.Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={ (collapsed, type) => {
            setIsCollapsed(collapsed);
        } }
    >
        <div className={ styles.logo }>
            <div>
                <img src={ logo } width='40' alt=''/>
            </div>
            <h1 className={ styles.picture }>Student Organizer</h1>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[keysMap[history.location.pathname]]} onClick={onMenuClickHandle}>
            <Menu.Item key="Ads" icon={ <NotificationOutlined/> }>
                Оголошення
            </Menu.Item>
            <Menu.Item key="Schedule" icon={ <ScheduleOutlined/> }>
                Розклад
            </Menu.Item>
            <Menu.Item key="MyGroup" icon={ <TeamOutlined/> }>
                Моя група
            </Menu.Item>
        </Menu>
    </Layout.Sider>;
};

export default Sider;