import {Link, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {Burger} from '../components/burger/burger';
import {OrderTotal} from '../components/order-total/order-total';
import {getOrdersStatuses} from '../services/utils/get-orders-statuses';

import styles from './order-tape.module.css';

export const OrderTape = () => {
    const location = useLocation();

    const {orders, total, totalToday} = useSelector(store => store.orderTape);
    
    return (
        <div className={styles.mainWrapper}>
            <div className={styles.wrapper}>
                {
                    orders.length ? (
                        <>
                            <p className={`text text_type_main-large ${styles.title}`}>Лента заказов</p>
                            <div className={styles.mainBlock}>
                                <div className={styles.burgers}>
                                    {
                                        orders.map((item, index) => (
                                            <Link key={index} className={styles.link} to={{
                                                pathname: `/feed/id${item._id}`,
                                                state: {
                                                    modal: location
                                                }
                                            }}>
                                                <div className={styles.itemWrapper}>
                                                    <Burger data={item}/>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                                <OrderTotal statusNumbers={getOrdersStatuses(orders)} total={total} totalToday={totalToday}/>
                            </div>
                        </>
                    ) : null
                }
            </div>
        </div>
    );
}
