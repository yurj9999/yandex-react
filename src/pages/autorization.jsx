import {useState, useRef} from 'react';

import {Logo, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './input-pages.module.css';

// костыль для ширины инпута
import './input-pages.css';

export const Autorization = () => {
    const passRef = useRef(null);

    const [email, setEmail] = useState('');

    const [passwordConfig, setPasswordConfig] = useState({
        type: 'password',
        value: '',
        icon: 'ShowIcon'
    });

    const onEyeClick = () => {
        setPasswordConfig({
            ...passwordConfig,
            type: passwordConfig.type === 'password' ? 'text' : 'password',
            icon: passwordConfig.icon === 'ShowIcon' ? 'HideIcon' : 'ShowIcon'
        });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <Logo/>
            </div>   
            <p className={`text text_type_main-medium ${styles.title}`}>Вход</p>

            <div className={styles.inputWrapper}>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    value={email}
                    onChange={event => setEmail(event.target.value)}/>
            </div>
            <div className={styles.inputWrapper}>
                <Input
                    type={passwordConfig.type}
                    placeholder={'Пароль'}
                    value={passwordConfig.value}
                    onChange={event => setPasswordConfig({
                        ...passwordConfig,
                        value: event.target.value
                    })}
                    icon={passwordConfig.icon}
                    ref={passRef}
                    onIconClick={onEyeClick}/>
            </div>

            <div className={styles.button}>
                <Button type="primary" size="large">Войти</Button>
            </div>
            
            <div className={`mb-4 ${styles.footer}`}>
                <p className={`text text_type_main-default ${styles.footerInfo}`}>Вы — новый пользователь?</p>
                <a href="" className={`text text_type_main-default ml-2 ${styles.footerEnter}`}>Зарегистрироваться</a>
            </div>

            <div className={styles.footer}>
                <p className={`text text_type_main-default ${styles.footerInfo}`}>Забыли пароль?</p>
                <a href="" className={`text text_type_main-default ml-2 ${styles.footerEnter}`}>Восстановить пароль</a>
            </div>
        </div>
    );
}
