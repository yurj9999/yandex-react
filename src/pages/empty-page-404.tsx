import {FC, ReactElement} from 'react';

import styles from './empty-page.module.css';

export const EmptyPage404: FC<{}> = (): ReactElement => {
    return (
        <p className={`text text_type_main-large ${styles.empty}`}>404</p>
    );
}
