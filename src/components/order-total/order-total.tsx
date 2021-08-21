import {FC, ReactElement} from 'react';

import styles from './order-total.module.css';

interface IStatusNumbers {
    done: number[];
    inWork: number[];
}

interface IOrderTotal {
    total: number;
    totalToday: number;
    statusNumbers: IStatusNumbers;
}

export const OrderTotal: FC<IOrderTotal> = ({statusNumbers, total, totalToday}): ReactElement => {
    const {done, inWork} = statusNumbers;

    return (
        <div className={styles.orderTotal}>
            <div className={styles.numbersWrapper}>
                <div>
                    <p className={`text text_type_main-medium ${styles.ready}`}>Готовы:</p>    
                    <div className={styles.itemsWrapper}>
                        {
                            done.map(item =>
                                <p key={item} className={`text text_type_digits-default ${styles.item} ${styles.readyColor}`}>
                                    {item}
                                </p>
                            )
                        }
                    </div>
                </div>
                <div>
                    <p className={`text text_type_main-medium ${styles.ready}`}>В работе:</p>
                    <div className={styles.itemsWrapper}>
                        {
                            inWork.map(item =>
                                <p key={item} className={`text text_type_digits-default ${styles.item}`}>
                                    {item}
                                </p>
                            )
                        }
                    </div>
                </div>
            </div>

            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className={`text text_type_digits-large ${styles.count}`}>{total}</p>

            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={`text text_type_digits-large ${styles.count}`}>{totalToday}</p>
        </div>
    );
}
