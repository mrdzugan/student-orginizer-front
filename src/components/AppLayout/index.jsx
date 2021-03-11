import React, { useState } from 'react';
import { Layout } from 'antd';
import Sider from './Sider';
import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

const AppLayout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return <Layout className='layout-container'>
        <Sider setIsCollapsed={setIsCollapsed}/>
        <Layout>
            <Header isCollapsed={isCollapsed}/>
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {children}
                </div>
            </Content>
            <Footer/>
        </Layout>
    </Layout>;
};

export default AppLayout;