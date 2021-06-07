import {useEffect} from 'react'; 
import {useDispatch} from 'react-redux';
import ReactDOM from 'react-dom';

import Modal from './modal/modal';

import {actions as modalActions} from '../../services/slices/modal';

import overlayStyle from './modal-overlay.module.css';

const overlayRoot = document.getElementById('overlay');

const ModalOverlay = () => {
    const dispatch = useDispatch();

    const onEscClose = () => {
        dispatch(modalActions.clearModal());
    }

    useEffect(() => {
        document.addEventListener('keydown', onEscClose);
        return () => document.removeEventListener('keydown', onEscClose);    
    });

    return ReactDOM.createPortal(
        (
            <div className={overlayStyle.main} onClick={onEscClose}>
                <Modal/>
            </div>
        ), overlayRoot);
}

export default ModalOverlay;
