import {useHistory} from 'react-router-dom';

import IngredientDetails from './ingredient-details/ingredient-details';
import OrderDetails from './order-details/order-details';

import {OrderInfo} from '../../../pages/order-info';

import modalStyle from './modal.module.css';
import close from '../../../images/close.png';

const Modal = () => {
    const history = useHistory();
    const historyPath = history.location.pathname.split('/');




    // и др проверки

    const isIngredient = !!historyPath.find(item => item === 'ingredients');
    const isStartOrder = !!historyPath.find(item => item === 'start-order');
    const isFeedItem = !!historyPath.find(item => item === 'feed' || item === 'profile');



    const mainModalHandler = event => event.stopPropagation();

    const closeModal = () => history.goBack();

    return (
        <div className={modalStyle.main} onClick={mainModalHandler}>
            <div className={modalStyle.wrapper}>
                {isIngredient && <IngredientDetails/>}
                {isStartOrder && <OrderDetails/>}
                {isFeedItem && <OrderInfo/>}
                <img src={close} className={modalStyle.close} alt="close" onClick={closeModal}/>
            </div>
        </div>
    );
}

export default Modal;
