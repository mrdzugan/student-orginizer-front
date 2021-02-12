import React from 'react';
import styles from './styles.module.css';
import { Card, Form, Input, Checkbox, Button, Select } from 'antd';
import authService from '../../services/auth.service';

const { Option } = Select;

const RegisterPage = () => {

    const onFinish = (values) => {
        if (values.isHeadman) {
            values.roles = ['headman'];
        }
        authService.register(values).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error);
        });
    };

    return <div className={ styles.background }>
        <Card title="Реєстрація" bordered={ false } className={ styles.registerCardContainer }>
            <Form
                name="register"
                initialValues={ {
                    isHeadman: false,
                } }
                onFinish={ onFinish }
            >

                <Form.Item
                    name="name"
                    rules={ [
                        {
                            required: true,
                            message: 'Будь ласка, введіть своє ім\'я!',
                        },
                    ] }
                >
                    <Input placeholder="Ім'я"/>
                </Form.Item>

                <Form.Item
                    name="surname"
                    rules={ [
                        {
                            required: true,
                            message: 'Будь ласка, введіть своє прізвище!',
                        },
                    ] }
                >
                    <Input placeholder="Прізвище"/>
                </Form.Item>

                <Form.Item
                    name="faculty"
                    rules={ [
                        {
                            required: true,
                            message: 'Будь ласка, виберіть факультет!',
                        },
                    ] }
                >
                    <Select placeholder="Факультет">
                        <Option value="jack">Комп'ютерних наук та технологій</Option>
                        <Option value="lucy">Мистецтва та дизайну</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="group"
                    rules={ [
                        {
                            required: true,
                            message: 'Будь ласка, виберіть групу!',
                        },
                    ] }
                >
                    <Select placeholder="Група">
                        <Option value="117">117</Option>
                        <Option value="127">127</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={ [
                        {
                            type: 'email',
                            message: 'Ви ввели некоректний E-mail!',
                        },
                        {
                            required: true,
                            message: 'Будь ласка, введіть свій Email!',
                        },
                    ] }
                >
                    <Input placeholder="Email"/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={ [
                        {
                            required: true,
                            message: 'Будь ласка, введіть майбутній пароль!',
                        },
                    ] }
                >
                    <Input.Password placeholder="Пароль"/>
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={ ['password'] }
                    hasFeedback
                    rules={ [
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
                    ] }>
                    <Input.Password placeholder="Підтвердження паролю"/>
                </Form.Item>

                <Form.Item>
                    <Form.Item name="isHeadman" valuePropName="checked" noStyle>
                        <Checkbox>Я староста</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={ styles.registerBtn }>
                        Зареєструватись
                    </Button>
                    Або <a href="/login">увійти!</a>
                </Form.Item>
            </Form>
        </Card>
    </div>;
};

export default RegisterPage;