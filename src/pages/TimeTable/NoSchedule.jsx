import React, { useState } from 'react';
import { Button, Result } from 'antd';
import CreateSchedule from './CreateSchedule';

const NoSchedule = (props) => {
    const [isModalOpened, setIsModalOpened] = useState(false);
    return (
        <>
            <Result
                status="404"
                title="Розклад"
                subTitle="Для вашої групи поки що немає розкладу"
                extra={ <Button type="primary" onClick={ () => setIsModalOpened(true) }>Створити розклад</Button> }
            />
            <CreateSchedule isOpened={ isModalOpened } closeModal={ () => setIsModalOpened(false) }{ ...props } />
        </>
    );
};

export default NoSchedule;