import {Link, useLocation} from 'react-router-dom';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ProfileLinks} from '../components/profile-links/profile-links';
import {Burger} from '../components/burger/burger';

import {WS_CONNECT_USER_ORDERS, WS_DISCONNECT_USER_ORDERS} from '../services/actions/index';
import {getCookie} from '../services/utils/cookie-helper';
import {setUserFromServer} from '../services/actions/index';

import styles from './order-history.module.css';

export const OrderHistory = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    
    const accessToken = useSelector(store => store.user.accessToken);
    const orders = useSelector(store => store.myOrders.orders);

    useEffect(() => {
        if (!accessToken) {
            dispatch(setUserFromServer());
        } else {
            dispatch({
                type: WS_CONNECT_USER_ORDERS,
                payload: {
                    url: `wss://norma.nomoreparties.space/orders?token=${getCookie('burgerAccessToken').substr(7)}`
                }
            });
        }
    }, [dispatch, accessToken]);

    useEffect(() => () => dispatch({
        type: WS_DISCONNECT_USER_ORDERS
    }), [dispatch]);

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.wrapper}>
                <div className={styles.linksWrapper}>
                    <ProfileLinks/>
                </div>

                <div className={styles.burgers}>
                    {
                        [...orders].reverse().map(item => (
                            <Link className={styles.link} key={item._id} to={{
                                pathname: `/profile/orders/id${item._id}`,
                                state: {
                                    modal: location
                                }
                            }}>
                                <div className={styles.itemWrapper}>
                                    <Burger data={item} needStatus={true}/>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}
