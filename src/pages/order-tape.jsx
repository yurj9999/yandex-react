import {Burger} from '../components/burger/burger';
import {OrderTotal} from '../components/order-total/order-total';

import styles from './order-tape.module.css';

export const OrderTape = () => {

    // временный массив имитация массива с бургерами
    const burgers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.wrapper}>
                <p className={`text text_type_main-large ${styles.title}`}>Лента заказов</p>

                <div className={styles.mainBlock}>
                    <div className={styles.burgers}>
                        {
                            burgers.map(() => (
                                <div className={styles.itemWrapper}>
                                    <Burger/>
                                </div>
                            ))
                        }
                    </div>
                    <OrderTotal/>
                </div>
            </div>
        </div>
    );
}
