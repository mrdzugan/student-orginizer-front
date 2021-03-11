import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Card, Form, Input, Checkbox, Button, Select, notification } from 'antd';
import authService from '../../services/auth.service';
import facultyService from '../../services/faculty.service';
import { useHistory, Link } from 'react-router-dom';

const { Option } = Select;

const RegisterPage = () => {

    const history = useHistory();
    const [registerError, setRegisterError] = useState('');
    const [facultyList, setFacultyList] = useState([]);

    useEffect(() => {
        const getFaculties = async () => {
            const response = await facultyService.getFaculties();
            setFacultyList(response.data);
        };
        getFaculties();
    }, []);

    const onFinish = (values) => {
        if (values.isHeadman) {
            values.roles = ['headman'];
        }
        authService.register(values).then((response) => {
            if (response.data.user.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
                history.push('/');
                const { name, surname } = response.data.user;
                notification.success({
                    message: 'Успішна реєстрація!',
                    description: `Вітаємо Вас, ${name} ${surname}. Бажаємо приємного користування нашою платформою :)`,
                });
            } else {
                setRegisterError('Виникла помилка, спробуйте пізніше');
            }
        }).catch((error) => {
            const { message } = error.response.data;
            setRegisterError(message);
        });
    };

    return <div className={styles.background}>
        <Card title="Реєстрація" bordered={false} className={styles.registerCardContainer}>
            <Form
                name="register"
                initialValues={{
                    isHeadman: false,
                }}
                onFinish={onFinish}
            >

                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка, введіть своє ім\'я!',
                        },
                    ]}
                >
                    <Input placeholder="Ім'я"/>
                </Form.Item>

                <Form.Item
                    name="surname"
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка, введіть своє прізвище!',
                        },
                    ]}
                >
                    <Input placeholder="Прізвище"/>
                </Form.Item>

                <Form.Item
                    name="faculty"
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка, виберіть факультет!',
                        },
                    ]}
                >
                    <Select placeholder="Факультет">
                        {facultyList.map(faculty => <Option key={faculty.name} value={faculty._id}>{faculty.name}</Option>)}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="group"
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка, виберіть групу!',
                        },
                    ]}
                >
                    <Select placeholder="Група">
                        <Option value="117">117</Option>
                        <Option value="127">127</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Ви ввели некоректний E-mail!',
                        },
                        {
                            required: true,
                            message: 'Будь ласка, введіть свій Email!',
                        },
                    ]}
                >
                    <Input placeholder="Email"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка, введіть майбутній пароль!',
                        },
                    ]}
                >
                    <Input.Password placeholder="Пароль"/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка, підтвердіть введений пароль!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('Паролі не співпадають!');
                            },
                        }),
                    ]}>
                    <Input.Password placeholder="Підтвердження паролю"/>
                </Form.Item>

                <Form.Item>
                    <Form.Item name="isHeadman" valuePropName="checked" noStyle>
                        <Checkbox>Я староста</Checkbox>
                    </Form.Item>
                </Form.Item>
                {registerError && <p className={styles.registerErrorMessage}>{registerError}</p>}

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.registerBtn}>
                        Зареєструватись
                    </Button>
                    Або <Link to="/login">увійти!</Link>
                </Form.Item>
            </Form>
        </Card>
    </div>;
};

export default RegisterPage;