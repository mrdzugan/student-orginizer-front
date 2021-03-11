import React from "react";
import { Layout } from "antd";
import styles from "./styles.module.css";

const Footer = () => {
    return <Layout.Footer className={ styles.footerText }>
        Student Organizer ©2020 Created by Andrei Dzugan (НУЗП, КНТ-127)
    </Layout.Footer>;
};

export default Footer;