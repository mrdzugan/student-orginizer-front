import React from "react";
import logo from "../images/logo.svg";
import styles from "./styles.module.css";
import { Layout, Menu } from "antd";
import { NotificationOutlined, ScheduleOutlined, TeamOutlined } from "@ant-design/icons";

const Sider = (props) => {
    const { setIsCollapsed } = props;
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={ ["1"] }>
            <Menu.Item key="1" icon={ <NotificationOutlined/> }>
                Оголошення
            </Menu.Item>
            <Menu.Item key="2" icon={ <ScheduleOutlined/> }>
                Розклад
            </Menu.Item>
            <Menu.Item key="3" icon={ <TeamOutlined/> }>
                Моя група
            </Menu.Item>
        </Menu>
    </Layout.Sider>;
};

export default Sider;