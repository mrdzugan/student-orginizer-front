import React, { useState, useEffect, useContext } from 'react';
import styles from './styles.module.css';
import { Card, Form, Input, Checkbox, Button, Select, notification } from 'antd';
import authService from '../../services/auth.service';
import facultyService from '../../services/faculty.service';
import { useHistory, Link } from 'react-router-dom';
import AuthContext from '../../contexts/auth.context';

const { Option } = Select;
const { useForm } = Form;

const RegisterPage = () => {

    const history = useHistory();
    const [registerError, setRegisterError] = useState('');
    const [facultyList, setFacultyList] = useState([]);
    const [formValues, setFormValues] = useState({});
    const [form] = useForm();

    const { setUserInfo } = useContext(AuthContext);

    useEffect(() => {
        const getFaculties = async () => {
            const response = await facultyService.getFaculties();
            setFacultyList(response.data);
        };
        getFaculties();
    }, []);

    const onValuesChangeHandle = (values) => {
        setFormValues(prevValues => {
            if (values.faculty && prevValues.faculty !== values.faculty) {
                delete values.group;
                form.setFieldsValue({ group: undefined });
            }
            return ({ ...prevValues, ...values });
        });
    };

    const onFinish = (values) => {
        if (values.isHeadman) {
            values.roles = ['headman'];
        }
        if (values.group === 'noGroup') {
            delete values.group;
        }
        authService.register(values).then((response) => {
            if (response.data.user.accessToken) {
                const userInfo = {
                    ...response.data.user,
                    faculty: facultyList.find(faculty => faculty._id === values.faculty),
                };
                setUserInfo(userInfo);
                localStorage.setItem('accessToken', response.data.user.accessToken);
                localStorage.setItem('userId', response.data.user.id);
                history.push('/');
                const { name, surname } = response.data.user;
                notification.success({
                    message: 'Успішна реєстрація!',
                    description: `Вітаємо Вас, ${ name } ${ surname }. Бажаємо приємного користування нашою платформою :)`,
                });
            } else {
                setRegisterError('Виникла помилка, спробуйте пізніше');
            }
        }).catch((error) => {
            const { message } = error.response?.data || {};
            setRegisterError(message || error);
        });
    };

    return <div className={ styles.background }>
        <Card title="Реєстрація" bordered={ false } className={ styles.registerCardContainer }>
            <Form
                name="register"
                initialValues={ {
                    isHeadman: false,
                } }
                form={ form }
                onValuesChange={ onValuesChangeHandle }
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
                        { facultyList.map(faculty => <Option key={ faculty.fullName }
                                                             value={ faculty._id }>{ faculty.fullName }</Option>) }
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
                        <Option value="noGroup">У списку немає моєї групи</Option>
                        { formValues.faculty &&
                        facultyList.find(faculty => {
                            return faculty._id === formValues.faculty;
                        }).groups.map(group => <Option key={ group.name }
                                                       value={ group.name }>{ group.name }</Option>) }
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
                { registerError && <p className={ styles.registerErrorMessage }>{ registerError }</p> }

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={ styles.registerBtn }>
                        Зареєструватись
                    </Button>
                    Або <Link to="/login">увійти!</Link>
                </Form.Item>
            </Form>
        </Card>
    </div>;
};

export default RegisterPage;