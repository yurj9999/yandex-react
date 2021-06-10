import {Link} from 'react-router-dom';

import {ProfileLinks} from '../components/profile-links/profile-links';
import {Burger} from '../components/burger/burger';

import styles from './order-history.module.css';

export const OrderHistory = () => {
    // временный массив с бургерами
    const burgers = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.wrapper}>
                <div className={styles.linksWrapper}>
                    <ProfileLinks type={'history'}/>
                </div>

                <div className={styles.burgers}>
                    {
                        burgers.map((item, index) => (

                            /*пока в кач-ве id для Link использую index, потом буду исп данные с бэкенда*/
                            <Link className={styles.link} key={index} to={`/profile/orders/${index}`}>
                                <div className={styles.itemWrapper}>
                                    <Burger needStatus={true} statusType={'inWork'}/>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
