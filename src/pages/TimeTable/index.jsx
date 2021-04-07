import React, { useState, useEffect, useContext } from 'react';
import AppLayout from '../../components/AppLayout';
import NoSchedule from './NoSchedule';
import Schedule from './Schedule';
import { Tabs } from 'antd';
import TimetableService from '../../services/timetable.service';
import AuthContext from '../../contexts/auth.context';

const { TabPane } = Tabs;

const TimeTable = () => {

    const [timetable, setTimetable] = useState(null);
    const { userInfo } = useContext(AuthContext);

    const fetchTimetable = async () => {
        const { data: { timetable: fetchedTimetable } } = await TimetableService.getTimetable(userInfo?.group?._id);
        setTimetable(fetchedTimetable || null);
    };

    useEffect(() => {
        fetchTimetable();
        //eslint-disable-next-line
    }, []);

    const [typeOfWeek, setTypeOfWeek] = useState('numerator');

    return <AppLayout>
        { timetable ?
            <Tabs
                activeKey={ typeOfWeek }
                onTabClick={ (type) => setTypeOfWeek(type) }
                animated={ { inkBar: true, tabPane: true } }
            >
                <TabPane tab="Чисельник" key="numerator">
                    <Schedule timetable={ timetable.schedule.numerator }/>
                </TabPane>
                <TabPane tab="Знаменник" key="denominator">
                    <Schedule timetable={ timetable.schedule.denominator }/>
                </TabPane>
            </Tabs>
            : <NoSchedule fetchTimetable={ fetchTimetable }/> }
    </AppLayout>;
};

export default TimeTable;