import {useCallback, useState, useEffect, FC, ReactElement} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from '../../../services/utils/modified-react-hooks';

import {getOrderDetails} from '../../../services/utils/get-order-details';
import {getCookie} from '../../../services/utils/cookie-helper';

import {Button} from '@ya.praktikum/react-developer-burger-ui-components';

import {IOrderItem} from '../../../interfaces';

import styles from './confirm-button.module.css';

interface IItem {
    name: string;
    order: IOrderItem;
    success: boolean;
}

export const ConfirmButton: FC<{}> = (): ReactElement => {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const {bun, fillings} = useSelector(store => store.constructorIngredients);

    const [buttonAvailible, setAvailible] = useState({
        text: 'Оформить заказ',
        isBlocked: false
    });

    const openModal = useCallback(async () => {
        if (Object.keys(bun).length) {
            if (getCookie('burgerAccessToken')?.length) {
                setAvailible({
                    text: 'Готовим заказ',
                    isBlocked: true
                });
            }

            dispatch({
                type: 'modal/setStartInfo'
            });

            history.push({
                pathname: '/start-order',
                state: {
                    modal: location
                }
            });

            try {
                const item: IItem = await getOrderDetails([
                    '_id' in bun && bun._id,
                    ...fillings.map(item => item._id),
                    '_id' in bun && bun._id
                ]);

                if (item instanceof Error) {
                    throw new Error();
                }

                if (window.location.pathname === '/start-order') {
                    dispatch({
                        type: 'modal/setEndInfo',
                        payload: {
                            number: item.order.number,
                            name: item.name
                        }
                    });
                } else if (window.location.pathname === '/') {
                    dispatch({
                        type: 'modal/setEndInfo',
                        payload: {
                            number: item.order.number,
                            name: item.name
                        }
                    });

                    history.push({
                        pathname: '/start-order',
                        state: {
                            modal: location
                        }
                    });
                }

                setAvailible({
                    text: 'Оформить заказ',
                    isBlocked: false
                });
            } catch (error) {
                console.log(error);
            }
        }
    }, [bun, fillings, history, location, dispatch]);

    useEffect(() => () => setAvailible({
        text: 'Оформить заказ',
        isBlocked: false
    }), []);

    return (
        <>
            <Button
                onClick={!buttonAvailible.isBlocked ? openModal : () => {}}
                type="primary"
                size="large">
                    {
                        !buttonAvailible.isBlocked ? buttonAvailible.text : (
                            <div>
                                <span className={styles.spinner}>
                                    <span className={styles.bottom}></span>
                                    <span className={styles.top}></span>
                                </span>
                                <span className={styles.loading}>{buttonAvailible.text}</span>
                            </div>
                        )
                    }
            </Button>
        </>
    );
}
