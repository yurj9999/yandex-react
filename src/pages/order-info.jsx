
import {useParams} from 'react-router-dom';

import {EmptyPage404} from '../pages/empty-page-404';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './order-info.module.css';

// временное изображение
import ingredientImg from '../images/bun-01.png';

export const OrderInfo = () => {
    const urlParams = useParams();

    // предполагаю, что данные id будут приходить с бэкенда, их я буду присваивать каждому заказу в /feed/<id>, /profile/orders/<id>
    // и сохранять в хранилище
    // массив с тестовыми данными, имитирует массив с айдишниками заказов
    const testIds = ['id0', 'id1', 'id2', 'id3', 'id4', 'id5', 'id6', 'id7'];

    // проверяем слвпадает ли id из строки браузера с id в имитируемом массиве
    // по нему определяем рисовать 404 стр или рисовать содержимое заказа
    const hasFeedId = testIds.find(item => item === urlParams.id);

    return (
        hasFeedId ? 
            (<div className={styles.wrapper}>
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
            </div>) : <EmptyPage404/>
    );
}
