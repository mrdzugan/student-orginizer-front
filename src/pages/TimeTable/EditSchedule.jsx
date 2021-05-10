import React, { useEffect } from 'react';
import namesOfWeekDays from '../../helpers/namesOfWeekDays';
import namesOfWeekTypes from '../../helpers/namesOfWeekTypes';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, notification, Space, Tag, Typography } from 'antd';
import TimetableService from '../../services/timetable.service';

const { Text } = Typography;

const EditSchedule = ({ editSchedule, timetableId, onCancel, reload }) => {
    const { dayOfWeek, weekType } = editSchedule || {};
    const [form] = Form.useForm();

    useEffect(() => {
        console.log(editSchedule?.lessons);
        form.setFieldsValue({ schedule: editSchedule?.lessons });
        // eslint-disable-next-line
    }, [editSchedule?.lessons]);

    const onFinish = async () => {
        const formValues = form.getFieldsValue();
        const parsedSchedule = formValues.schedule.map(lesson => ({
            subject: lesson?.subject || '',
            teacher: lesson?.teacher || '',
        }));
        const response = await TimetableService.updateTimetable(timetableId, {
            ...editSchedule,
            lessons: [...parsedSchedule]
        });
        if (response.status === 200) {
            reload();
            notification.success({
                message: `Оновлення розкладу`,
                description: `Розклад було успішно оновлено!`,
            });
            return onCancel();
        }
        return notification.error({
            message: 'Виникла помилка'
        });
    };

    return (
        <Modal
            onOk={ onFinish }
            okText={ 'Зберегти' }
            visible={ !!editSchedule }
            onCancel={ onCancel }
            maskClosable={ false }
            cancelText="Відмінити"
            title={ `(${ namesOfWeekTypes[weekType] }) ${ namesOfWeekDays[dayOfWeek] }` }
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

export default EditSchedule;