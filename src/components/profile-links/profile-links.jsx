import {useCallback} from 'react';

import PropTypes from 'prop-types';

import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import {exitUser} from '../../services/actions/index';

import {Link} from 'react-router-dom';

import styles from './profile-links.module.css';

export const ProfileLinks = ({type}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userData = useSelector(store => store.user);
    
    const onExit = useCallback(() => {

        
        history.replace({pathname: '/'});
        
        dispatch(exitUser({
            token: localStorage.getItem('burgerRefreshToken')
        }));


        /*dispatch(exitUser({
            token: localStorage.getItem('burgerRefreshToken')
        }))
            .then(() => history.replace({pathname: '/'}))
            .catch(error => console.log(error));*/
    }, [history, userData.user.name, dispatch]);

    return (
        <div className={styles.menuProfile}>
            <div className={styles.itemMenu}>
                <Link to="/profile"
                    className={`text text_type_main-medium ${styles.link} ${type === 'profile' ? styles.checked : styles.unchecked}`}>
                        Профиль
                </Link>
            </div>
            <div className={styles.itemMenu}>
                <Link to="/profile/orders"
                    className={`text text_type_main-medium ${styles.link} ${type === 'history' ? styles.checked : styles.unchecked}`}>
                        История заказов
                </Link>
            </div>
            <div className={`${styles.itemMenu} ${styles.lastItemMenu}`}>
                <div onClick={onExit} className={`text text_type_main-medium ${styles.link} ${styles.exitBtn} ${type === 'exit' ? styles.checked : styles.unchecked}`}>Выход</div>
            </div>

            <p className={`text text_type_main-default ${styles.footerMenu}`}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
    );
}

ProfileLinks.propTypes = {
    type: PropTypes.string.isRequired
};
