import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

import styles from './profile-links.module.css';

export const ProfileLinks = ({type}) => {
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
                
                {/*позже здесь будет роут выхода*/}
                <Link to="/ss"
                    className={`text text_type_main-medium ${styles.link} ${type === 'exit' ? styles.checked : styles.unchecked}`}>
                        Выход
                </Link>
            </div>

            <p className={`text text_type_main-default ${styles.footerMenu}`}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
    );
}

ProfileLinks.propTypes = {
    type: PropTypes.string.isRequired
};
