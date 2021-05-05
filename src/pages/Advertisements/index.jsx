import React, { useEffect, useState } from 'react';
import { Button, Empty, Comment, Avatar, Tooltip } from 'antd';
import AppLayout from '../../components/AppLayout';
import AdvertisementService from '../../services/advertisement.service';
import { format, formatDistanceToNow } from 'date-fns';
import CreateAdvertisement from './CreateAdvertisement';
import EditAdvertisement from './EditAdvertisement';

const Advertisements = () => {
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
        setOpenedModal(advertisement);
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
        <CreateAdvertisement
            refresh={ refresh }
            isModalOpened={ openedModal === 'create' }
            closeModal={ () => setOpenedModal('') }
        />
        <EditAdvertisement
            refresh={ refresh }
            advertisement={ openedModal }
            isModalOpened={ typeof openedModal === 'object' }
            closeModal={ () => setOpenedModal('') }
        />
    </AppLayout>;
};

export default Advertisements;