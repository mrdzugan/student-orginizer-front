import React, { useEffect, useState } from 'react';
import AppLayout from '../../components/AppLayout';
import GroupService from '../../services/group.service';
import AuthService from '../../services/auth.service';
import { Table, Tag } from 'antd';

const columns = [
    {
        title: `Ім'я`,
        dataIndex: 'fullName',
        key: 'fullName',
        //render: fullName => <a>{ fullName }</a>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Роль',
        dataIndex: 'role',
        key: 'role',
        render: role => (
            <>
                <Tag color="green" key={ role }>
                    { role.toUpperCase() }
                </Tag>
            </>
        ),
    },
];

const getUserRole = (roles) => {
    console.log(roles);
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

const MyGroup = () => {

    const [members, setMembers] = useState([]);

    useEffect(() => {
        const getMembers = async () => {
            const user = AuthService.getCurrentUser();
            const { data: { group } } = await GroupService.getGroup(user?.group?._id);
            const members = group.members.map(member => {
                const roles = member.roles.map(role => `ROLE_${ role.name.toUpperCase() }`);
                return {
                    ...member,
                    fullName: `${ member.name } ${ member.surname }`,
                    role: getUserRole(roles)
                };
            });
            setMembers(members);
        };
        getMembers();
    }, []);
    return <AppLayout>
        <Table columns={ columns } dataSource={ members }/>
    </AppLayout>;
};

export default MyGroup;