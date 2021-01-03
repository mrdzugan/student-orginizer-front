import React, { useState } from "react";
import "./App.css";
import { Layout } from "antd";
import Router from "./components/router";
import Header from "./components/Header";
import Sider from "./components/Sider";
import Footer from "./components/Footer";

const { Content } = Layout;

const App = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return <Layout className='layout-container'>
        <Sider setIsCollapsed={ setIsCollapsed }/>
        <Layout>
            <Header isCollapsed={ isCollapsed }/>
            <Content style={ { margin: "24px 16px 0" } }>
                <Router/>
            </Content>
            <Footer/>
        </Layout>
    </Layout>;
};

export default App;
