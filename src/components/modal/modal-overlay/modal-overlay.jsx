import {useHistory} from 'react-router-dom';

import styles from './modal-overlay.module.css';

export const ModalOverlay = ({children}) => {
    const history = useHistory();

    const mainHandler = () => history.goBack();

    return (
        <div className={styles.main} onClick={mainHandler}>
            {children}
        </div>
    );
}
