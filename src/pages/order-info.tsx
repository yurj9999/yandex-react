import {useEffect, useState, FC, ReactElement} from 'react';
import {useSelector, useDispatch} from '../services/utils/modified-react-hooks';
import {useParams} from 'react-router-dom';

import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import {SYMBOL_COUNT_START_ID_IN_URL} from '../services/constants';
import {getBurgerIngredients} from '../services/utils/get-burger-ingredients';
import {getBurgerPrice} from '../services/utils/get-burger-price';
import {getStrDataCreated} from '../services/utils/get-str-data-created';
import {getBurgerStatus} from '../services/utils/get-burger-status';
import {
    WS_CONNECT_ORDER_TAPE,
    WS_CONNECT_USER_ORDERS,
    setUserFromServer
} from '../services/actions/index';
import {getCookie} from '../services/utils/cookie-helper';

import {IOrderItem} from '../interfaces';

import styles from './order-info.module.css';

interface IOrderInfo {
    showOrders: 'my' | 'all';
}

interface IParams {
    id: string;
}

export const OrderInfo: FC<IOrderInfo> = ({showOrders}): ReactElement | null => {
    const urlParams = useParams<IParams>();
    const dispatch = useDispatch();
    
    const [burger, setBurger] = useState<IOrderItem | null>(null);

    const {ingredients} = useSelector(store => store.ingredients);
    const accessToken = useSelector(store => store.user.accessToken);

    const orders = useSelector(store => showOrders === 'all' ? store.orderTape.orders : store.myOrders.orders);
    
    useEffect(() => {
        if (!orders.length) {
            switch(showOrders) {
                case 'all':
                    dispatch({
                        type: WS_CONNECT_ORDER_TAPE,
                        payload: {
                            url: 'wss://norma.nomoreparties.space/orders/all'
                        }
                    });
                    break;

                case 'my':
                    if (!accessToken) {
                        dispatch(setUserFromServer());
                    } else {
                        dispatch({
                            type: WS_CONNECT_USER_ORDERS,
                            payload: {
                                url: `wss://norma.nomoreparties.space/orders?token=${(getCookie('burgerAccessToken') as string).substr(7)}`
                            }
                        });
                    }
                    break;
            }
        } else {
            setBurger(
                orders.find(burger =>
                    burger._id === urlParams.id.substr(SYMBOL_COUNT_START_ID_IN_URL, urlParams.id.length - 1)) as IOrderItem
            );
        }
    }, [
        dispatch,
        orders,
        accessToken,
        showOrders,
        urlParams.id
    ]);

    return (
        burger ? (
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    <p className="text text_type_digits-default">{`#${burger.number}`}</p>
                </div>
                <p className="text text_type_main-medium mb-2">{burger.name}</p>
                <p className={`text text_type_main-default ${styles.status}`}>{getBurgerStatus(burger.status)}</p>
                <p className={`text text_type_main-medium ${styles.details}`}>Состав:</p>
                <div className={styles.orderDetailsWrapper}>
                    {
                        getBurgerIngredients(burger.ingredients, ingredients).map(item => (
                            <div key={item.id} className={styles.ingredient}>
                                <div className={styles.ingredientWrapper}>
                                    <img alt="ingredient" src={item.image_mobile} className={styles.img}/>
                                    <p className="text text_type_main-default">{item.name}</p>
                                </div>
                                <div className={styles.countCostWrapper}>
                                    <p className={`text text_type_digits-default ${styles.cost}`}>{item.count} x {item.price}</p>
                                    <CurrencyIcon type="primary"/>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className={styles.footer}>
                    <p className={`text text_type_main-default ${styles.footerText}`}>{getStrDataCreated(burger.createdAt)}</p>
                    <div className={styles.countWrapper}>
                        <p className={`text text_type_digits-default ${styles.cost}`}>{getBurgerPrice(burger.ingredients, ingredients)}</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        ) : null
    );
}
