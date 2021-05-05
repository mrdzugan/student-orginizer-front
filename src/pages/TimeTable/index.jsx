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
    const [reloadTrigger, reload] = useState(false);
    const { userInfo } = useContext(AuthContext);

    const fetchTimetable = async () => {
        try {
            const { data: { timetable: fetchedTimetable } } = await TimetableService.getTimetable(userInfo?.group?._id);
            console.log(fetchedTimetable);
            setTimetable(fetchedTimetable || null);
        } catch(e) {
            console.dir(e);
        }
    };

    useEffect(() => {
        fetchTimetable();
        //eslint-disable-next-line
    }, [reloadTrigger]);

    const [typeOfWeek, setTypeOfWeek] = useState('numerator');

    return <AppLayout>
        { timetable ?
            <Tabs
                activeKey={ typeOfWeek }
                onTabClick={ (type) => setTypeOfWeek(type) }
                animated={ { inkBar: true, tabPane: true } }
            >
                <TabPane tab="Чисельник" key="numerator">
                    <Schedule
                        reload={ () => reload(v => !v)}
                        weekType="numerator"
                        timetableId={ timetable._id }
                        timetable={ timetable.schedule.numerator }
                    />
                </TabPane>
                <TabPane tab="Знаменник" key="denominator">
                    <Schedule
                        reload={() => reload(v => !v)}
                        weekType="denominator"
                        timetableId={ timetable._id }
                        timetable={ timetable.schedule.denominator }
                    />
                </TabPane>
            </Tabs>
            : <NoSchedule fetchTimetable={ fetchTimetable }/> }
    </AppLayout>;
};

export default TimeTable;