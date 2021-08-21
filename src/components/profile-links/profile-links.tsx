import {FC, ReactElement} from 'react';
import {useDispatch} from '../../services/utils/modified-react-hooks';
import {useHistory} from 'react-router-dom';

import {exitUser} from '../../services/actions/index';
import {actions as userActions} from '../../services/slices/user';

import {NavLink} from 'react-router-dom';

import styles from './profile-links.module.css';

export const ProfileLinks: FC<{}> = (): ReactElement => {
    const {setUserClear} = userActions;

    const dispatch = useDispatch();
    const history = useHistory();

    const onExit = async () => {
        await dispatch(exitUser({
            token: localStorage.getItem('burgerRefreshToken') as string
        }));

        history.replace({pathname: '/login'});
        dispatch(setUserClear());
    };

    return (
        <div className={styles.menuProfile}>
            <div className={styles.itemMenu}>
                <NavLink exact to="/profile"
                    className={`text text_type_main-medium ${styles.link} ${styles.unchecked}`}
                    activeClassName={styles.checked}>Профиль
                </NavLink>
            </div>
            <div className={styles.itemMenu}>
                <NavLink exact to="/profile/orders"
                    className={`text text_type_main-medium ${styles.link} ${styles.unchecked}`}
                    activeClassName={styles.checked}>История заказов
                </NavLink>
            </div>
            <div className={`${styles.itemMenu} ${styles.lastItemMenu}`}>
                <div onClick={onExit} className={`text text_type_main-medium ${styles.link} ${styles.exitBtn} ${styles.unchecked}`}>Выход</div>
            </div>

            <p className={`text text_type_main-default ${styles.footerMenu}`}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
    );
}
