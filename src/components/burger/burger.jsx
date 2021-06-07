import {useMemo} from 'react';

import PropTypes from 'prop-types';

import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger.module.css';

// временный импорт
import img from '../../images/bun-01.png';

const LAST_VISIBLE_INGREDIENTS = 5;
const MAX_VISIBLE_INGREDIENTS = 6;
const RIGHT_POSITION = 15;

export const Burger = ({needStatus = false, statusType = 'done'}) => {

    // в последующем будет приходить массив с данными об ингредиентах
    const ingredients = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const statusData = useMemo(() => {
        switch(statusType) {
            case 'cancelled':
                return {
                    style: styles.cancelled,
                    text: 'Отменен'
                };

            case 'inWork':
                return {
                    style: styles.inWork,
                    text: 'Готовится'
                };

            default:
                return {
                    style: '',
                    text: 'Выполнен'
                };
        }
    }, [statusType]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleWrapper}>
                <p className="text text_type_digits-default">#034535</p>
                <p className={`text text_type_main-default ${styles.titleTime}`}>Сегодня, 16:20 i-GMT+3</p>
            </div>

            <div className={styles.textWrapper}>
                <p className={`text text_type_main-medium ${styles.captionBurger}`}>Death Star Starship Main бургер</p>
                {
                    needStatus
                        ? <p className={`text text_type_main-default ${statusData.style}`}>{statusData.text}</p>
                        : null
                }
            </div>
                
            <div className={styles.burgerWrapper}>
                <div className={styles.ingredientsWrapper}>
                    {
                        ingredients.map((ingredient, index) => {
                            if (index < MAX_VISIBLE_INGREDIENTS) {
                                if (index === LAST_VISIBLE_INGREDIENTS) {
                                    return (
                                        <div key={index} className={styles.imgWrapper} style={{
                                            zIndex: ingredients.length - index,
                                            right: `${index === 0 ? 0 : RIGHT_POSITION * index}px`
                                        }}>
                                            <div className={styles.ingredientCount}>
                                                <p className="text text_type_main-default">
                                                    +{ingredients.length - index - 1}
                                                </p>
                                            </div>
                                            <img className={styles.img} style={{
                                                position: 'absolute'
                                            }} src={img}/>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <img key={index} className={styles.img} style={{
                                            zIndex: ingredients.length - index,
                                            right: `${index === 0 ? 0 : RIGHT_POSITION * index}px`
                                        }} src={img}/>
                                    );
                                }
                            }
                        })
                    }
                </div>

                <div className={styles.costWrapper}>
                    <p className={`text text_type_digits-default ${styles.cost}`}>480</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div> 
    );
}

Burger.propTypes = {
    needStatus: PropTypes.bool,
    statusType: PropTypes.string
};
