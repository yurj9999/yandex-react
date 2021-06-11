import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-info.module.css';

// временное изображение
import ingredientImg from '../images/bun-01.png';

export const OrderInfo = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <p className="text text_type_digits-default">#034533</p>
            </div>

            <p className="text text_type_main-medium mb-2">Black Hole Singularity острый бургер</p>
            <p className={`text text_type_main-default ${styles.status}`}>Выполнен</p>

            <p className={`text text_type_main-medium ${styles.details}`}>Состав:</p>

            <div className={styles.orderDetailsWrapper}>
                <div className={styles.ingredient}>
                    <div className={styles.ingredientWrapper}>
                        <img alt="ingredient" src={ingredientImg} className={styles.img}/>
                        <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
                    </div>
                    <div className={styles.countCostWrapper}>
                        <p className={`text text_type_digits-default ${styles.cost}`}>2 x 20</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>

                <div className={styles.ingredient}>
                    <div className={styles.ingredientWrapper}>
                        <img alt="ingredient" src={ingredientImg} className={styles.img}/>
                        <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
                    </div>
                    <div className={styles.countCostWrapper}>
                        <p className={`text text_type_digits-default ${styles.cost}`}>2 x 20</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>

                <div className={styles.ingredient}>
                    <div className={styles.ingredientWrapper}>
                        <img alt="ingredient" src={ingredientImg} className={styles.img}/>
                        <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
                    </div>
                    <div className={styles.countCostWrapper}>
                        <p className={`text text_type_digits-default ${styles.cost}`}>2 x 20</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>

                <div className={styles.ingredient}>
                    <div className={styles.ingredientWrapper}>
                        <img alt="ingredient" src={ingredientImg} className={styles.img}/>
                        <p className="text text_type_main-default">Флюоресцентная булка R2-D3</p>
                    </div>
                    <div className={styles.countCostWrapper}>
                        <p className={`text text_type_digits-default ${styles.cost}`}>2 x 20</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>

            <div className={styles.footer}>
                <p className={`text text_type_main-default ${styles.footerText}`}>Вчера, 13:50 i-GMT+3</p>
                <div className={styles.countWrapper}>
                    <p className={`text text_type_digits-default ${styles.cost}`}>510</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    );
}
