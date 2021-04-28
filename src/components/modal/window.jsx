import PropTypes from 'prop-types';

import modalStyle from './window.module.css';
import close from '../../images/close.png';

const Modal = ({mainTemplate, onModalClick}) => {
    const mainModalHandler = (event) => {
        event.stopPropagation();
    }

    return (
        <div className={modalStyle.main} onClick={mainModalHandler}>
            <div className={modalStyle.wrapper}>
                {mainTemplate}
                <img src={close} className={modalStyle.close} alt="close" onClick={onModalClick}/>
            </div>
        </div>
    );
}

Modal.propTypes = {
    mainTemplate: PropTypes.node.isRequired,
    onModalClick: PropTypes.func.isRequired
};

export default Modal;
