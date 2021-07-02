import React from 'react';
import {NavLink} from 'react-router-dom';

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyle from './app-header.module.css';

const AppHeader = () => {
    return (
        <header className={appHeaderStyle.headerWrapper}>
            <div className={appHeaderStyle.wrapperMenu}>
                <div className={appHeaderStyle.flex}>
                    <div className={`mt-2 mb-2 p-2 ${appHeaderStyle.flex}`}>
                        <BurgerIcon type="primary"/>
                        <NavLink
                            exact to="/"
                            isActive={(match, location) => match || location.pathname.indexOf('ingredients') !== -1 || location.pathname.indexOf('start-order') !== -1}
                            activeClassName={appHeaderStyle.lightTextColor}
                            className={`text text_type_main-default ml-1 ${appHeaderStyle.feedLink} ${appHeaderStyle.darkTextColor}`}>Конструктор</NavLink>
                    </div>
                    <div className={`mt-2 mb-2 p-2 ${appHeaderStyle.flex}`}>
                        <ListIcon type="primary"/>
                        <NavLink
                            className={`text text_type_main-default ml-1 ${appHeaderStyle.feedLink} ${appHeaderStyle.darkTextColor}`}
                            activeClassName={appHeaderStyle.lightTextColor}
                            to="/feed">Лента заказов</NavLink>
                    </div>
                </div>
                <div className={`mt-2 mb-2 p-2 ${appHeaderStyle.flex}`}>
                    <ProfileIcon type="primary"/>
                    <NavLink
                        className={`text text_type_main-default ml-1 ${appHeaderStyle.feedLink} ${appHeaderStyle.darkTextColor}`}
                        activeClassName={appHeaderStyle.lightTextColor}
                        to="/profile">Личный кабинет</NavLink>
                </div>
            </div>
            <div className={appHeaderStyle.logoWrapper}>
                <Logo/>
            </div>
        </header>
    );
}

export default React.memo(AppHeader);
