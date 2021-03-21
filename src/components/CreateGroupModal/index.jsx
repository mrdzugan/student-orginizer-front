import React from 'react';
import GroupService from '../../services/group.service';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';
import { Modal, Form, Input, Select, notification } from 'antd';
import authService from '../../services/auth.service';
import * as _ from 'lodash';

const CreateGroupModal = ({ visible, onFinish }) => {
    const [form] = Form.useForm();
    const userInfo = AuthService.getCurrentUser();
    const userFaculty = userInfo.faculty;
    const userId = userInfo.id;
    const onCreate = async (values) => {
        values.userId = userId;
        values.faculty = userInfo.facultyId;
        try {
            try {
                const result = await GroupService.createGroup(values);
                if (result) {
                    const response = await UserService.getUser(userId);
                    const currentUserInfo = authService.getCurrentUser();
                    const newUserInfo = _.omit({ ...currentUserInfo, ...response.data.user }, ['password', '_v']);
                    localStorage.setItem('user', JSON.stringify(newUserInfo));
                }
            } catch (error) {
                const { message } = error.response?.data || {};
                return notification.error({
                    message: message || error
                });
            }
            notification.success({
                message: `Група '${ userFaculty.abbreviation } - ${ values.name }' успішно створена!`,
                description: `Вас було автоматично включено до неї`,
            });
        } catch (e) {
            console.error(e);
        }
        onFinish();
    };

    const onCancel = () => {
        onFinish();
    };

    return (
        <Modal
            visible={ visible }
            title="Створити нову групу"
            okText="Створити"
            cancelText="Відміна"
            onCancel={ onCancel }
            onOk={ () => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            } }
        >
            <Form
                form={ form }
                name="createGroupModal"
                initialValues={ {
                    faculty: userFaculty?.fullName,
                } }
            >
                <Form.Item
                    name="faculty"
                    label="Факультет"
                    rules={ [
                        {
                            required: true,
                            message: 'Будь ласка, оберіть потрібний факультет!',
                        },
                    ] }
                >
                    <Select disabled/>
                </Form.Item>
                <Form.Item
                    name="name"
                    label="Номер групи"
                    rules={ [
                        {
                            required: true,
                            message: 'Будь ласка, введіть номер групи!',
                        },
                    ] }
                >
                    <Input addonBefore={ `${ userFaculty?.abbreviation } -` } type="number"/>
                </Form.Item>
                {/*<Form.Item name="isAddToGroup" label="Додати мене до цієї групи" valuePropName="checked">
                    <Switch />
                </Form.Item>*/ }
            </Form>
        </Modal>
    );
};

export default CreateGroupModal;