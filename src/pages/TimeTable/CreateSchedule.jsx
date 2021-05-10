import React, { useState } from 'react';
import { Form, Modal, Input, Button, Space, Typography, Tag } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import namesOfWeekDays from '../../helpers/namesOfWeekDays';
import namesOfWeekTypes from '../../helpers/namesOfWeekTypes';
import TimetableService from '../../services/timetable.service';

const defaultScheduleValues = {
    numerator: [],
    denominator: []
};

const scheduleValues = defaultScheduleValues;

const { Text } = Typography;

const CreateSchedule = ({ isOpened, closeModal, fetchTimetable }) => {

    const [dayOfWeek, setDayOfWeek] = useState(0);
    const [typeOfWeek, setTypeOfWeek] = useState('numerator');

    const [form] = Form.useForm();

    const changeScheduleValues = (type, values) => {
        const { schedule = [] } = values;
        const parsedSchedule = schedule.map(lesson => lesson || { subject: '', teacher: '' });
        const scheduleWithDay = {
            dayOfWeek,
            lessons: parsedSchedule
        };
        scheduleValues[type] = [...scheduleValues[type], scheduleWithDay];
    };

    const onCancel = () => {
        setDayOfWeek(0);
        closeModal();
    };

    const onFinish = async () => {
        await TimetableService.createTimetable({ schedule: scheduleValues });
        closeModal();
        fetchTimetable();
    };

    const onOk = () => {
        const values = form.getFieldsValue();
        changeScheduleValues(typeOfWeek, values);
        form.resetFields();
        if (dayOfWeek === 6) {
            if (typeOfWeek === 'numerator') {
                setDayOfWeek(0);
                setTypeOfWeek('denominator');
                return;
            }
            return onFinish();
        }
        setDayOfWeek((prevValue) => prevValue + 1);
    };

    return (
        <Modal
            onOk={ onOk }
            okText={dayOfWeek === 6 && typeOfWeek === 'denominator' ? 'Завершити' : 'Наступний день'}
            visible={ isOpened }
            onCancel={ onCancel }
            maskClosable={ false }
            cancelText="Відмінити"
            title={ `(${ namesOfWeekTypes[typeOfWeek] }) ${ namesOfWeekDays[dayOfWeek] }` }
        >
            <p style={ { marginBottom: 24 } }>
                <Text type="secondary">- Якщо пара випадає на вікно, залишайте обидва поля у рядку порожніми</Text> <br/>
                <Text type="secondary">- Якщо у цей день немає пар, пропустіть натиснувши "Наступний день"</Text>
            </p>
            <Form name="dynamic_form_nest_item" form={ form } autoComplete="off">
                <Form.List name="schedule">
                    { (fields, { add, remove }) => (
                        <>
                            { fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                <Space key={ key } style={ { display: 'flex', marginBottom: 8 } } align="baseline">
                                    <Tag color="processing">{ index + 1 }</Tag>
                                    <Form.Item
                                        { ...restField }
                                        name={ [name, 'subject'] }
                                        fieldKey={ [fieldKey, 'subject'] }
                                    >
                                        <Input placeholder="Предмет"/>
                                    </Form.Item>
                                    <Form.Item
                                        { ...restField }
                                        name={ [name, 'teacher'] }
                                        fieldKey={ [fieldKey, 'teacher'] }
                                    >
                                        <Input placeholder="Викладач"/>
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={ () => remove(name) }/>
                                </Space>
                            )) }
                            <Form.Item>
                                <Button type="dashed" onClick={ () => add() } block icon={ <PlusOutlined/> }>
                                    Додати пару
                                </Button>
                            </Form.Item>
                        </>
                    ) }
                </Form.List>
            </Form>
        </Modal>
    );
};

export default CreateSchedule;