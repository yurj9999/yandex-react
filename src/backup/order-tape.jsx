import {useEffect} from 'react';

import {Link, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

import {Burger} from '../components/burger/burger';
import {OrderTotal} from '../components/order-total/order-total';
import {getOrdersStatuses} from '../services/utils/get-orders-statuses';

import {WS_CONNECT_ORDER_TAPE, WS_DISCONNECT_ORDER_TAPE} from '../services/actions/index';

import styles from './order-tape.module.css';

export const OrderTape = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const {orders, total, totalToday} = useSelector(store => store.orderTape);

    useEffect(() => {
        dispatch({
            type: WS_CONNECT_ORDER_TAPE,
            payload: {
                url: 'wss://norma.nomoreparties.space/orders/all'
            }
        });

        return () => {
            dispatch({
                type: WS_DISCONNECT_ORDER_TAPE
            });
        };
    }, [dispatch]);

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
                                        orders.map((item, index) => {
                                            return (
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
                                            );
                                        }) 
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
