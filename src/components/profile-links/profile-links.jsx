import styles from './profile-links.module.css';

export const ProfileLinks = () => {
    return (
        <div className={styles.menuProfile}>
            <div className={styles.itemMenu}>
                <p className="text text_type_main-medium">Профиль</p>
            </div>
            <div className={styles.itemMenu}>
                <p className="text text_type_main-medium">История заказов</p>
            </div>
            <div className={`${styles.itemMenu} ${styles.lastItemMenu}`}>
                <p className="text text_type_main-medium">Выход</p>
            </div>

            <p className={`text text_type_main-default ${styles.footerMenu}`}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>
    );
}
