import PropTypes from 'prop-types';

import {OrderList} from './order-list/order-list';
import {fillMaxList} from '../../services/utils/fill-max-list';

import styles from './order-total.module.css';

export const OrderTotal = ({statusNumbers, total, totalToday}) => {
    const readyLists = fillMaxList(statusNumbers.done);
    const workLists = fillMaxList(statusNumbers.inWork);

    return (
        <div className={styles.orderTotal}>
            <div className={styles.numbersWrapper}>
                <div>
                    <p className={`text text_type_main-medium ${styles.ready}`}>Готовы:</p>
                    {
                        readyLists.map((list, index) => <OrderList key={`${index}${list[0]}`} orderList={list} type="done"/>)
                    } 
                </div>
                <div>
                    <p className={`text text_type_main-medium ${styles.ready}`}>В работе:</p>
                    {
                        workLists.map((list, index) => <OrderList key={index} orderList={list}/>)
                    }
                </div>
            </div>

            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className={`text text_type_digits-large ${styles.count}`}>{total}</p>

            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={`text text_type_digits-large ${styles.count}`}>{totalToday}</p>
        </div>
    );
}

OrderTotal.propTypes = {
    statusNumbers: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
    totalToday: PropTypes.number.isRequired
};
