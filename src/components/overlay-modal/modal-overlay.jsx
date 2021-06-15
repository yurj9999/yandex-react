import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useHistory} from 'react-router-dom';

import Modal from './modal/modal';

import overlayStyle from './modal-overlay.module.css';

const overlayRoot = document.getElementById('overlay');

const ModalOverlay = () => {
    const history = useHistory();

    const onEscClose = () => history.goBack();

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
