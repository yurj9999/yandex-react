import {useEffect} from 'react'; 
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Modal from '../modal/modal';

import overlayStyle from './modal-overlay.module.css';

const overlayRoot = document.getElementById('overlay');

const ModalOverlay = ({children, onOverlayClick}) => {
    const onEscClose = () => {
        onOverlayClick();
    }

    useEffect(() => {
        document.addEventListener('keydown', onEscClose);
        return () => document.removeEventListener('keydown', onEscClose);    
    });

    return ReactDOM.createPortal(
        (
            <div className={overlayStyle.main} onClick={onOverlayClick}>
                <Modal mainTemplate={children} onModalClick={onOverlayClick}/>
            </div>
        ), 
    overlayRoot);
}

ModalOverlay.propTypes = {
    children: PropTypes.node,
    onOverlayClick: PropTypes.func.isRequired
};

export default ModalOverlay;
