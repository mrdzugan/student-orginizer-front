import React, { useState } from 'react';
import { Card, List, Typography } from 'antd';
import { Link } from 'react-router-dom';
import namesOfWeekDays from '../../helpers/namesOfWeekDays';
import getISODay from 'date-fns/getISODay';
import EditSchedule from './EditSchedule';

const isToday = (dayOfWeek) => getISODay(new Date()) === dayOfWeek + 1;
const isWeekend = (dayOfWeek) => [5, 6].includes(dayOfWeek);

const Schedule = ({ timetable, timetableId, weekType, reload }) => {
    const [editSchedule, setEditSchedule] = useState(null);

    const onOpenEditModal = (day) => {
        day.weekType = weekType;
        console.log(day);
        setEditSchedule(day);
    };

    return (
        <div style={ { display: 'flex', flexWrap: 'wrap' } }>
            { timetable.map(day => {
                const { dayOfWeek } = day;
                return <Card
                    hoverable
                    size="small"
                    title={ <Typography.Text strong>{ namesOfWeekDays[dayOfWeek] }</Typography.Text> }
                    extra={ <Link onClick={ () => onOpenEditModal(day) }>Редагувати</Link> }
                    style={ {
                        width: 250,
                        margin: 5,
                        borderRadius: 10,
                        borderWidth: isWeekend(dayOfWeek) ? '3px' : '0px',
                        borderColor: isWeekend(dayOfWeek) ? 'rgba(255,24,24,0.3)' : 'none',
                        backgroundColor: isToday(dayOfWeek) ? 'rgba(24,144,255,0.3)' : 'rgba(0, 21, 41,0.15)'
                    } }
                >
                    <List
                        size="small"
                        dataSource={ day.lessons }
                        ocale={{ emptyText: "Немає пар" }}
                        renderItem={ (lesson, index) => (
                            <List.Item>
                                <Typography.Text type="secondary">({ index + 1 }) </Typography.Text>
                                { lesson.subject } { lesson.teacher && `(${ lesson.teacher })` }
                            </List.Item>
                        ) }
                    />
                </Card>;
            }) }
            <EditSchedule
                reload={ reload }
                timetableId={ timetableId }
                editSchedule={ editSchedule }
                onCancel={ () => setEditSchedule(null) }
            />
        </div>
    );
};

export default Schedule;