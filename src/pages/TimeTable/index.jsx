import React from 'react';
import { Table, Tag } from 'antd';
import { columns, dataSource } from './mocks';
import AppLayout from '../../components/AppLayout';

const TimeTable = () => {
    return <AppLayout>
        <Tag style={{ marginBottom: 5 }} color="blue">Чисельник</Tag>
        <Table
            columns={columns}
            pagination={false}
            bordered size="small"
            scroll={{ x: true }}
            dataSource={dataSource}
        />
    </AppLayout>;
};

export default TimeTable;