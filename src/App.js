import React, { useState } from 'react';
import './App.css';
import { Layout, Menu, Button, Table, Tag } from 'antd';
import { NotificationOutlined, ScheduleOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import logo from './components/logo.svg';

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const dataSource = [
        {
            key: 'lesson1',
            lessonNumber: 1,
            monday: '',
            tuesday: 'Математика',
            wednesday: 'Укр. мова',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: '',
        },
        {
            key: 'lesson2',
            lessonNumber: 2,
            monday: 'Фізична культура',
            tuesday: 'Програмування',
            wednesday: '',
            thursday: '',
            friday: 'Проектування',
            saturday: '',
            sunday: '',
        },
        {
            key: 'lesson3',
            lessonNumber: 3,
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: 'Англійська мова',
            saturday: '',
            sunday: '',
        },
        {
            key: 'lesson4',
            lessonNumber: 4,
            monday: '',
            tuesday: 'Математика',
            wednesday: 'Укр. мова',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: '',
        },
        {
            key: 'lesson5',
            lessonNumber: 5,
            monday: '',
            tuesday: 'Математика',
            wednesday: 'Укр. мова',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: '',
        },
    ];

    const columns = [
        {
            title: '№ пари',
            dataIndex: 'lessonNumber',
            key: 'lessonNumber',
        },
        {
            title: 'Понеділок',
            dataIndex: 'monday',
            key: 'monday',
        },
        {
            title: 'Вівторок',
            dataIndex: 'tuesday',
            key: 'tuesday',
            style: { backgroundColor: 'blue' },
            className: 'currentDate',
        },
        {
            title: 'Середа',
            dataIndex: 'wednesday',
            key: 'wednesday',
        },
        {
            title: 'Четвер',
            dataIndex: 'thursday',
            key: 'thursday',
        },
        {
            title: 'П\'ятниця',
            dataIndex: 'friday',
            key: 'friday',
        },
        {
            title: 'Субота',
            dataIndex: 'saturday',
            key: 'saturday',
        },
        {
            title: 'Неділя',
            dataIndex: 'sunday',
            key: 'sunday',
        },
    ];

    return <Layout className='layout-container'>
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onCollapse={(collapsed, type) => {
                setIsCollapsed(collapsed);
            }}
        >
            <div className="logo">
                <div><img src={logo} width='40' alt=''/></div>
                <h1 className='picture'>Student Organizer</h1>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<NotificationOutlined/>}>
                    Оголошення
                </Menu.Item>
                <Menu.Item key="2" icon={<ScheduleOutlined/>}>
                    Розклад
                </Menu.Item>
                <Menu.Item key="3" icon={<TeamOutlined/>}>
                    Моя група
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout>
            <Header className="site-layout-sub-header-background"
                    style={{ padding: 0, justifyContent: isCollapsed ? 'space-between' : 'flex-end' }}>
                {isCollapsed && <div className="logo">
                    <div className='picture'><img src={logo} width='40' alt=''/></div>
                </div>}
                <div className='user-info-container'>
                    <UserOutlined/>
                    <div className='user-info'>
                        <span>Андрій Дзугань</span>
                        <span>КНТ-127 Студент</span>
                    </div>
                    <Button size='small' className='auth-btn' ghost>Logout</Button>
                </div>
            </Header>
            <Content style={{ margin: '24px 16px 0' }}>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <Tag style={{ marginBottom: 5 }} color="blue">Чисельник</Tag>
                    <Table pagination={false} bordered size='small' scroll={{ x: true }} dataSource={dataSource}
                           columns={columns}/>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Student Organizer ©2020 Created by Andrei Dzugan (НУЗП,
                КНТ-127)</Footer>
        </Layout>
    </Layout>;
}

export default App;
