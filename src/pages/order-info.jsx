import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import PropTypes from 'prop-types';

import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import {SYMBOL_COUNT_START_ID_IN_URL} from '../services/constants';
import {getBurgerIngredients} from '../services/utils/get-burger-ingredients';
import {getBurgerPrice} from '../services/utils/get-burger-price';
import {getStrDataCreated} from '../services/utils/get-str-data-created';
import {getBurgerStatus} from '../services/utils/get-burger-status';

import styles from './order-info.module.css';

export const OrderInfo = ({store}) => {
    const urlParams = useParams();

    const burgerId = urlParams.id.substr(SYMBOL_COUNT_START_ID_IN_URL, urlParams.id.length - 1);

    const {ingredients} = useSelector(store => store.ingredients);

    const burger = store.find(burger => burger._id === burgerId);

    return (
        burger && Object.keys(burger) ? (
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

OrderInfo.propTypes = {
    store: PropTypes.array
};