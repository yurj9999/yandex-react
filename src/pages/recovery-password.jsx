import {useState} from 'react';

import {Logo, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './input-pages.module.css';

// костыль для ширины инпута
import './input-pages.css';

export const RecoveryPassword = () => {
    const [email, setEmail] = useState('');

    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <Logo/>
            </div>   
            <p className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</p>

            <div className={styles.inputWrapper}>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    value={email}
                    onChange={event => setEmail(event.target.value)}/>
            </div>

            <div className={styles.button}>
                <Button type="primary" size="large">Восстановить</Button>
            </div>
            
            <div className={styles.footer}>
                <p className={`text text_type_main-default ${styles.footerInfo}`}>Вспомнили пароль?</p>
                <a href="" className={`text text_type_main-default ml-2 ${styles.footerEnter}`}>Войти</a>
            </div>
        </div>
    );
}
