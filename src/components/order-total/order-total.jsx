import styles from './order-total.module.css';

export const OrderTotal = () => {
    return (
        <div className={styles.orderTotal}>
            <div className={styles.numbersWrapper}>
                <div>
                    <p className={`text text_type_main-medium ${styles.ready}`}>Готовы:</p>
                    <div className={styles.itemsWrapper}>
                        <p className={`text text_type_digits-default ${styles.item} ${styles.readyColor}`}>034533</p>
                        <p className={`text text_type_digits-default ${styles.item} ${styles.readyColor}`}>034533</p>
                        <p className={`text text_type_digits-default ${styles.item} ${styles.readyColor}`}>034533</p>
                        <p className={`text text_type_digits-default ${styles.item} ${styles.readyColor}`}>034533</p>
                        <p className={`text text_type_digits-default ${styles.item} ${styles.readyColor}`}>034533</p>
                        <p className={`text text_type_digits-default ${styles.item} ${styles.readyColor}`}>034533</p>
                    </div>
                </div>
                <div>
                    <p className={`text text_type_main-medium ${styles.ready}`}>В работе:</p>
                    <div className={styles.itemsWrapper}>
                        <p className={`text text_type_digits-default ${styles.item}`}>034533</p>
                        <p className={`text text_type_digits-default ${styles.item}`}>034533</p>
                        <p className={`text text_type_digits-default ${styles.item}`}>034533</p>
                        <p className={`text text_type_digits-default ${styles.item}`}>034533</p>
                        <p className={`text text_type_digits-default ${styles.item}`}>034533</p>
                        <p className={`text text_type_digits-default ${styles.item}`}>034533</p>
                    </div>
                </div>
            </div>

            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className={`text text_type_digits-large ${styles.count}`}>28 752</p>

            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className={`text text_type_digits-large ${styles.count}`}>138</p>
        </div>
    );
}
