import {useSelector, useDispatch} from 'react-redux';

import IngredientDetails from './ingredient-details/ingredient-details';
import OrderDetails from './order-details/order-details';

import {actions as modalActions} from '../../../services/slices/modal';

import modalStyle from './modal.module.css';
import close from '../../../images/close.png';

const Modal = () => {
    const dispatch = useDispatch();
    const {modalType} = useSelector(state => state.modal);

    const mainModalHandler = (event) => {
        event.stopPropagation();
    }

    const closeModal = () => {
        dispatch(modalActions.clearModal());
    }

    return (
        <div className={modalStyle.main} onClick={mainModalHandler}>
            <div className={modalStyle.wrapper}>
                {modalType === 'ingredient' ? <IngredientDetails/> : <OrderDetails/>}
                <img src={close} className={modalStyle.close} alt="close" onClick={closeModal}/>
            </div>
        </div>
    );
}

export default Modal;
