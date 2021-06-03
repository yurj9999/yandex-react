import {useState, useRef} from 'react';
import {Link} from 'react-router-dom';

import {resetPass} from '../services/utils/reset-pass';

import {Logo, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './input-pages.module.css';

// костыль для ширины инпута
import './input-pages.css';

export const ResetPassword = () => {
    const passRef = useRef(null);

    const [code, setCode] = useState('');

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

    const onSave = () => {
        resetPass({
            code,
            password: passwordConfig.value
        });
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <Logo/>
            </div>   
            <p className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</p>

            <div className={styles.inputWrapper}>
                <Input
                    type={passwordConfig.type}
                    placeholder={'Введите новый пароль'}
                    value={passwordConfig.value}
                    onChange={event => setPasswordConfig({
                        ...passwordConfig,
                        value: event.target.value
                    })}
                    icon={passwordConfig.icon}
                    ref={passRef}
                    onIconClick={onEyeClick}/>
            </div>

            <div className={styles.inputWrapper}>
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    value={code}
                    onChange={event => setCode(event.target.value)}/>
            </div>

            <div className={styles.button}>
                <Button type="primary" size="large" onClick={onSave}>Сохранить</Button>
            </div>
            
            <div className={styles.footer}>
                <p className={`text text_type_main-default ${styles.footerInfo}`}>Вспомнили пароль?</p>
                <Link to="/login" className={`text text_type_main-default ml-2 ${styles.footerEnter}`}>Войти</Link>
            </div>
        </div>
    );
}
