import React from "react";
import logo from "../logo.svg";
import styles from "./styles.css";
import { Button, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Header = (props) => {
    const { isCollapsed } = props;
    return <Layout.Header
        className={ styles.headerContainer }
        style={ { padding: 0, justifyContent: isCollapsed ? "space-between" : "flex-end" } }>
        { isCollapsed && <div className={ styles.logo }>
            <div className={ styles.picture }>
                <img src={ logo } width='40' alt=''/>
            </div>
        </div> }
        <div className={ styles.userInfoContainer }>
            <UserOutlined/>
            <div className={ styles.userInfo }>
                <span>Андрій Дзугань</span>
                <span>КНТ-127 Студент</span>
            </div>
            <Button size='small' ghost>Logout</Button>
        </div>

    </Layout.Header>;
};

export default Header;