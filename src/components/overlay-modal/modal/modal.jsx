import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import IngredientDetails from './ingredient-details/ingredient-details';
import OrderDetails from './order-details/order-details';

import {OrderInfo} from '../../../pages/order-info';

import modalStyle from './modal.module.css';
import close from '../../../images/close.png';

const Modal = () => {
    const history = useHistory();

    const allOrders = useSelector(store => store.orderTape.orders);
    const myOrders = useSelector(store => store.myOrders.orders);

    const historyPath = history.location.pathname.split('/');

    const isIngredient = !!historyPath.find(item => item === 'ingredients');
    const isStartOrder = !!historyPath.find(item => item === 'start-order');
    const isFeedItem = !!historyPath.find(item => item === 'feed');
    const isMyItem = !!historyPath.find(item => item === 'profile');

    const mainModalHandler = event => event.stopPropagation();

    const closeModal = () => history.goBack();

    return (
        <div className={modalStyle.main} onClick={mainModalHandler}>
            <div className={modalStyle.wrapper}>
                {isIngredient && <IngredientDetails/>}
                {isStartOrder && <OrderDetails/>}
                {isFeedItem && <OrderInfo store={allOrders}/>}
                {isMyItem && <OrderInfo store={myOrders}/>}
                <img src={close} className={modalStyle.close} alt="close" onClick={closeModal}/>
            </div>
        </div>
    );
}

export default Modal;
