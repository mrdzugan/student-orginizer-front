import React, { useEffect, useState } from 'react';
import { Button, Empty, Comment, Avatar, Tooltip, Modal, Form, Input } from 'antd';
import AppLayout from '../../components/AppLayout';
import AdvertisementService from '../../services/advertisement.service';
import { format, formatDistanceToNow } from 'date-fns';

const Advertisements = () => {
    const [form] = Form.useForm();
    const [advertisements, setAdvertisements] = useState([]);
    const [openedModal, setOpenedModal] = useState('');
    const [_, setRefresh] = useState(false);

    const refresh = () => setRefresh(prev => !prev);

    const getUTCDate = (dateString) => {
        const date = new Date(dateString);

        return new Date(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds(),
        );
    };

    const openEditModalHandle = (advertisement) => {
        form.setFieldsValue(advertisement);
        setOpenedModal(advertisement._id);
    };

    useEffect(() => {
        (async () => {
            const response = await AdvertisementService.getAdvertisements();
            setAdvertisements(response?.data || []);
        })();
    }, [_]);

    return <AppLayout>
        <div style={ { width: '100%', display: 'flex', justifyContent: 'flex-end' } }>
            <Button type="primary" onClick={ () => setOpenedModal('create') }>Створити оголошення</Button>
        </div>
        { !advertisements.length && <Empty/> }
        { advertisements.map(advertisement =>
            <Comment
                actions={ [<Button size="small"
                                   onClick={ () => openEditModalHandle(advertisement) }>Редагувати</Button>] }
                author={ <a>{ advertisement.user.name } { advertisement.user.surname }</a> }
                avatar={
                    <Avatar
                        src="https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png"
                        alt="Han Solo"
                    />
                }
                content={
                    <>
                        <h3>{ advertisement.title }</h3>
                        <p>{ advertisement.description }</p>
                    </>
                }
                datetime={
                    <Tooltip
                        title={ format(getUTCDate(advertisement.createdAt), 'dd.MM.yyyy HH:mm:ss') }>
                        <span>{ formatDistanceToNow(getUTCDate(advertisement.createdAt), { includeSeconds: true }) }</span>
                    </Tooltip>
                }
            />) }
        <Modal
            visible={ !!openedModal }
            title="Створити нове оголошення"
            okText="Зберегти"
            cancelText="Відміна"
            onCancel={ () => setOpenedModal('') }
            onOk={ () => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        if (openedModal === 'create') {
                            AdvertisementService.createAdvertisement(values).then(refresh);
                        } else {
                            AdvertisementService.updateAdvertisement(openedModal, values).then(refresh);
                        }
                        setOpenedModal('');
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            } }
                >
                <Form
                form={ form }
                layout="vertical"
                name="form_in_modal"
                initialValues={ {
                title: '',
                description: ''
            } }
                >
                <Form.Item
                name="title"
                label="Заголовок"
                rules={ [
            {
                required: true,
                message: 'Введіть будь ласка заголовок Вашого оголошення',
            },
                ] }
                >
                <Input/>
                </Form.Item>
                <Form.Item name="description" label="Повідомлення">
                <Input.TextArea rows={ 4 }/>
                </Form.Item>
                </Form>
                </Modal>
                </AppLayout>;
            };

export default Advertisements;