import React, { useEffect, useState, useContext } from 'react';
import AppLayout from '../../components/AppLayout';
import GroupService from '../../services/group.service';
import { Table, Tag } from 'antd';
import AuthContext from '../../contexts/auth.context';

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
                <Tag color={getRoleColor(role)} key={ role }>
                    { role.toUpperCase() }
                </Tag>
            </>
        ),
    },
];

const getRoleColor = (role) => {
    if (role === 'Куратор') {
        return 'red';
    }
    else if (role === 'Староста') {
        return 'yellow';
    }
    else if (role === 'Студент(ка)') {
        return 'green';
    }
    return 'green';
}

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
    const { userInfo } = useContext(AuthContext);

    useEffect(() => {
        const getMembers = async () => {
            const { data: { group } } = await GroupService.getGroup(userInfo?.group?._id);
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
        if (userInfo?.group?._id) {
            getMembers();
        }
        // eslint-disable-next-line
    }, []);
    return <AppLayout>
        <Table
            columns={ columns }
            dataSource={ members }
            scroll={ { x: true } }
            rowKey={ (record) => record.email }
        />
    </AppLayout>;
};

export default MyGroup;