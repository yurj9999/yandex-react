import PropTypes from 'prop-types';

import styles from './order-list.module.css';

export const OrderList = ({orderList, type = 'work'}) => {
    return (
        <div className={styles.itemsWrapper}>
            {
                orderList.map(item =>
                    <p key={item} className={`text text_type_digits-default ${styles.item} ${ type === 'done' && styles.readyColor}`}>
                        {item}
                    </p>
                )
            }
        </div>
    );
}

OrderList.propTypes = {
    orderList: PropTypes.array.isRequired,
    type: PropTypes.string
}
