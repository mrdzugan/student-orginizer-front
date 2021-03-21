import React, { useState, useContext } from 'react';
import styles from './styles.module.css';
import { Card, Form, Input, Checkbox, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import authService from '../../services/auth.service';
import { useHistory, Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth.context';


const LoginPage = () => {

    const history = useHistory();

    const { setUserInfo } = useContext(AuthContext);

    const [loginError, setLoginError] = useState('');

    const onFinish = (values) => {
        authService.login(values.email, values.password).then(async response => {
            if (response.data.user.accessToken) {
                setUserInfo(response.data.user);
                localStorage.setItem('accessToken', response.data.user.accessToken);
                localStorage.setItem('userId', response.data.user.id);
                history.push('/');
                const { name, surname } = response.data.user;
                notification.success({
                    message: 'Успішна авторизація!',
                    description: `Вітаємо Вас, ${ name } ${ surname }. Бажаємо приємного користування нашою платформою :)`,
                });
            } else {
                setLoginError('Виникла помилка, спробуйте пізніше');
            }
        }).catch((error) => {
            if (error.response) {
                const { message } = error.response.data;
                setLoginError(message);
                return;
            }
            setLoginError('Виникла помилка, спробуйте пізніше');
        });
    };

    return <div className={ styles.background }>
        <Card title="Авторизація" bordered={ false } className={ styles.loginCardContainer }>
            <Form
                name="login"
                initialValues={ {
                    remember: true,
                } }
                onFinish={ onFinish }
            >
                <Form.Item
                    name="email"
                    rules={ [
                        {
                            required: true,
                            message: 'Будь ласка, введіть свій Email!',
                        },
                    ] }
                >
                    <Input prefix={ <UserOutlined/> } placeholder="Email"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={ [
                        {
                            required: true,
                            message: 'Будь ласка, введіть свій пароль!',
                        },
                    ] }
                >
                    <Input
                        prefix={ <LockOutlined/> }
                        type="password"
                        placeholder="Пароль"
                    />
                </Form.Item>
                { loginError && <p className={ styles.loginErrorMessage }>{ loginError }</p> }
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Запам'ятати мене</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={ styles.loginBtn }>
                        Увійти
                    </Button>
                    Або <Link to="/register">зареєструватись!</Link>
                </Form.Item>
            </Form>
        </Card>
    </div>;
};

export default LoginPage;