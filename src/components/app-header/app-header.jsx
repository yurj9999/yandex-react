import React from 'react';

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyle from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={appHeaderStyle.headerWrapper}>
            <div className={appHeaderStyle.wrapperMenu}>
                <div className={appHeaderStyle.flex}>
                    <div className={`mt-2 mb-2 p-2 ${appHeaderStyle.flex}`}>
                        <BurgerIcon type="primary"/>
                        <span className="text text_type_main-default ml-1">Конструктор</span>
                    </div>
                    <div className={`mt-2 mb-2 p-2 ${appHeaderStyle.flex}`}>
                        <ListIcon type="secondary"/>
                        <span className={`text text_type_main-default ml-1 ${appHeaderStyle.darkTextColor}`}>Лента заказов</span>
                    </div>
                </div>
                <div className={`mt-2 mb-2 p-2 ${appHeaderStyle.flex}`}>
                    <ProfileIcon type="secondary"/>
                    <span className={`text text_type_main-default ml-1 ${appHeaderStyle.darkTextColor}`}>Личный кабинет</span>
                </div>
            </div>
            <div className={appHeaderStyle.logoWrapper}>
                <Logo/>
            </div>
        </header>
    );
}

export default React.memo(AppHeader);
