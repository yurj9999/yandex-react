import {useEffect} from 'react'; 
import {useDispatch} from 'react-redux';
import ReactDOM from 'react-dom';

import Modal from './modal/modal';

import {CLEAR_MODAL} from '../../services/constants';

import overlayStyle from './modal-overlay.module.css';

const overlayRoot = document.getElementById('overlay');

const ModalOverlay = () => {
    const dispatch = useDispatch();

    const onEscClose = () => {
        dispatch({
            type: CLEAR_MODAL
        });
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
