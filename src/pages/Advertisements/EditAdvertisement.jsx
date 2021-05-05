import React, { useContext, useEffect } from 'react';
import AdvertisementService from '../../services/advertisement.service';
import { Form, Input, Modal } from 'antd';
import AuthContext from '../../contexts/auth.context';

const EditAdvertisement = ({ isModalOpened, closeModal, refresh, advertisement }) => {
    const [form] = Form.useForm();
    const { userInfo } = useContext(AuthContext);

    useEffect(() => {
        form.setFieldsValue(advertisement);
    }, [advertisement]);

    return <Modal
        visible={ isModalOpened }
        title="Оновлення оголошення"
        okText="Зберегти"
        cancelText="Відміна"
        onCancel={ () => closeModal() }
        onOk={ () => {
            form
                .validateFields()
                .then((values) => {
                    form.resetFields();
                    values.group = userInfo.group._id;
                    AdvertisementService.updateAdvertisement(advertisement._id, values).then(refresh);
                    closeModal();
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
    </Modal>;
};

export default EditAdvertisement;