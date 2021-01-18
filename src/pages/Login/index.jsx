import React from 'react';
import styles from './styles.module.css';
import { Card, Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';



const LoginPage = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return <div className={ styles.background }>
        <Card title="Авторизація" bordered={ false } className={styles.loginCardContainer}>
            <Form
                name="login"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка, введіть свій Email!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Будь ласка, введіть свій пароль!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Пароль"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Запам'ятати мене</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.loginBtn}>
                        Увійти
                    </Button>
                    Або <a href="/register">зареэструватись!</a>
                </Form.Item>
            </Form>
        </Card>
    </div>
}

export default LoginPage;