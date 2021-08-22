import {FC, ReactElement, ReactNode} from 'react';

import {useHistory} from 'react-router-dom';

import styles from './modal-overlay.module.css';

interface IModalOverlay {
    children: ReactNode;
}

export const ModalOverlay: FC<IModalOverlay> = ({children}): ReactElement => {
    const history = useHistory();

    const mainHandler = () => history.goBack();

    return (
        <div className={styles.main} onClick={mainHandler}>
            {children}
        </div>
    );
}
