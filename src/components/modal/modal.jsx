import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useHistory} from 'react-router-dom';

import {ModalOverlay} from './modal-overlay/modal-overlay';

import close from '../../images/close.png';
import styles from './modal.module.css';

const modal = document.getElementById('modal');

export const Modal = ({children}) => {
    const history = useHistory();

    useEffect(() => {
        document.addEventListener('keydown', closeModal);
        return () => document.removeEventListener('keydown', closeModal);    
    });

    const onModalClick = event => event.stopPropagation();

    const closeModal = () => history.goBack();

    return ReactDOM.createPortal(
        (
            <ModalOverlay>
                <div className={styles.main} onClick={onModalClick}>
                    <div className={styles.wrapper}>
                        {children}
                        <img src={close} className={styles.close} alt="close" onClick={closeModal}/>
                    </div>
                </div>
            </ModalOverlay>
        ), modal);
}
