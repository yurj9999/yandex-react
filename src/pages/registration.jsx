import {useState, useRef} from 'react';

import {Logo, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './input-pages.module.css';

// костыль для ширины инпута
import './input-pages.css';

export const Registration = () => {
    const passRef = useRef(null);

    const [name, setName] = useState('');
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
            <p className={`text text_type_main-medium ${styles.title}`}>Регистрация</p>

            <div className={styles.inputWrapper}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    value={name}
                    onChange={event => setName(event.target.value)}
                    />
            </div>
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
                <Button type="primary" size="large">Зарегистрироваться</Button>
            </div>
            
            <div className={styles.footer}>
                <p className={`text text_type_main-default ${styles.footerInfo}`}>Уже зарегистрированы?</p>
                <a href="" className={`text text_type_main-default ml-2 ${styles.footerEnter}`}>Войти</a>
            </div>
        </div>
    );
}
