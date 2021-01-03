import React from "react";
import { Table, Tag } from "antd";
import { columns, dataSource } from "./mocks";

const TimeTable = () => {
    return <div className="site-layout-background" style={ { padding: 24, minHeight: 360 } }>
        <Tag style={ { marginBottom: 5 } } color="blue">Чисельник</Tag>
        <Table
            columns={ columns }
            pagination={ false }
            bordered size="small"
            scroll={ { x: true } }
            dataSource={ dataSource }
        />
    </div>;
};

export default TimeTable;