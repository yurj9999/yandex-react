import React from 'react';
import {Link} from 'react-router-dom';

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyle from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={appHeaderStyle.headerWrapper}>
            <div className={appHeaderStyle.wrapperMenu}>
                <div className={appHeaderStyle.flex}>
                    <div className={`mt-2 mb-2 p-2 ${appHeaderStyle.flex}`}>
                        <BurgerIcon type="primary"/>
                        <Link to="/" className={appHeaderStyle.feedLink}>
                            <span className={`text text_type_main-default ml-1 ${appHeaderStyle.constrLink}`}>Конструктор</span>
                        </Link>
                    </div>
                    <div className={`mt-2 mb-2 p-2 ${appHeaderStyle.flex}`}>
                        <ListIcon type="secondary"/>
                        <Link className={appHeaderStyle.feedLink} to="/feed">
                            <span className={`text text_type_main-default ml-1 ${appHeaderStyle.darkTextColor}`}>Лента заказов</span>
                        </Link>
                    </div>
                </div>
                <div className={`mt-2 mb-2 p-2 ${appHeaderStyle.flex}`}>
                    <ProfileIcon type="secondary"/>
                    <Link className={appHeaderStyle.feedLink} to="/profile">
                        <span className={`text text_type_main-default ml-1 ${appHeaderStyle.darkTextColor}`}>Личный кабинет</span>
                    </Link>
                </div>
            </div>
            <div className={appHeaderStyle.logoWrapper}>
                <Logo/>
            </div>
        </header>
    );
}

export default React.memo(AppHeader);
