import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import {getBurgerStatus} from '../../services/utils/get-burger-status';
import {getStrDataCreated} from '../../services/utils/get-str-data-created';
import {getBurgerPrice} from '../../services/utils/get-burger-price';

import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import {
    LAST_VISIBLE_INGREDIENTS,
    MAX_VISIBLE_INGREDIENTS,
    RIGHT_INGREDIENT_POSITION
} from '../../services/constants';

import styles from './burger.module.css';

export const Burger = ({data, needStatus = false}) => {
    const {createdAt, name, number, status} = data;
    const {ingredients} = useSelector(store => store.ingredients);

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleWrapper}>
                <p className="text text_type_digits-default">{`#${number}`}</p>
                <p className={`text text_type_main-default ${styles.titleTime}`}>{getStrDataCreated(createdAt)}</p>
            </div>

            <div className={styles.textWrapper}>
                <p className={`text text_type_main-medium ${styles.captionBurger}`}>{name}</p>
                {
                    needStatus
                        ? <p className={`text text_type_main-default ${status === 'pending' && styles.cancelled} ${status === 'done' && styles.inWork}`}>{getBurgerStatus(status)}</p>
                        : null
                }
            </div>
                
            <div className={styles.burgerWrapper}>
                <div className={styles.ingredientsWrapper}>
                    {
                        data.ingredients.map((id, index) => {
                            if (id !== null) {
                                if (index < MAX_VISIBLE_INGREDIENTS) {
                                    if (index === LAST_VISIBLE_INGREDIENTS) {
                                        return (
                                            <div key={id} className={styles.imgWrapper} style={{
                                                zIndex: data.ingredients.length - index,
                                                right: `${index === 0 ? 0 : RIGHT_INGREDIENT_POSITION * index}px`
                                            }}>
                                                <div className={styles.ingredientCount}>
                                                    <p className="text text_type_main-default">
                                                        +{data.ingredients.length - index}
                                                    </p>
                                                </div>
                                                <img alt="ingredient" className={styles.img} style={{
                                                    position: 'absolute'
                                                }} src={ingredients.find(item => item._id === id).image_mobile}/>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <img alt="ingredient" key={id + index} className={styles.img} style={{
                                                zIndex: data.ingredients.length - index,
                                                right: `${index === 0 ? 0 : RIGHT_INGREDIENT_POSITION * index}px`
                                            }} src={ingredients.find(item => item._id === id).image_mobile}/>
                                        );
                                    }
                                } else {
                                    return null;
                                }
                            } else {
                                return null;
                            }
                        })
                    }
                </div>

                <div className={styles.costWrapper}>
                    <p className={`text text_type_digits-default ${styles.cost}`}>{getBurgerPrice(data.ingredients, ingredients)}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    );
}

Burger.propTypes = {
    data: PropTypes.object.isRequired,
    needStatus: PropTypes.bool
};
