import {useState, useRef, useEffect} from 'react';

import {ProfileLinks} from '../components/profile-links/profile-links';

import {Input} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './input-pages.module.css';

// костыль для ширины инпута
import './input-pages.css';

export const UserProfile = () => {
    const nameRef = useRef(null);
    const loginRef = useRef(null);
    const passRef = useRef(null);

    const [nameConfig, setNameConfig] = useState({
        name: '',
        disabled: true
    });

    const [loginConfig, setLoginConfig] = useState({
        login: '',
        disabled: true
    });

    const [passConfig, setPassConfig] = useState({
        pass: '',
        disabled: true,
        type: 'password'
    });

    const onNameClick = () => {
        setNameConfig({
            ...nameConfig,
            disabled: nameConfig.disabled ? false : true
        });        
    }

    const onLoginClick = () => {
        setLoginConfig({
            ...loginConfig,
            disabled: loginConfig.disabled ? false : true
        });        
    }

    const onPassClick = () => {
        setPassConfig({
            ...passConfig,
            type: 'text',
            disabled: passConfig.disabled ? false : true
        });        
    }

    useEffect(() => nameRef.current.focus(), [nameConfig.disabled]);
    useEffect(() => loginRef.current.focus(), [loginConfig.disabled]);
    useEffect(() => passRef.current.focus(), [passConfig.disabled]);

    return (
        <div className={styles.mainProfileWrapper}>
            <div className={styles.profileWrapper}>
                <div className={styles.linksWrapper}>
                    <ProfileLinks type={'profile'}/>
                </div>
                
                <div className={styles.inputsWrapper}>
                    <div>
                        <div className={styles.inputWrapper}>
                            <Input
                                ref={nameRef}
                                onIconClick={nameConfig.disabled
                                    ? () => onNameClick()
                                    : () => null
                                }
                                disabled={nameConfig.disabled}
                                icon={'EditIcon'}
                                type={'text'}
                                placeholder={'Имя'}
                                value={nameConfig.name}
                                onBlur={() => setNameConfig({
                                    ...nameConfig,
                                    disabled: true
                                })}
                                onChange={!nameConfig.disabled
                                    ? event => setNameConfig({
                                        ...nameConfig,
                                        name: event.target.value
                                    })
                                    : () => null
                                }/>
                        </div>

                        <div className={styles.inputWrapper}>
                            <Input
                                ref={loginRef}
                                onIconClick={loginConfig.disabled
                                    ? () => onLoginClick()
                                    : () => null
                                }
                                disabled={loginConfig.disabled}
                                icon={'EditIcon'}
                                type={'text'}
                                placeholder={'Логин'}
                                value={loginConfig.login}
                                onBlur={() => setLoginConfig({
                                    ...loginConfig,
                                    disabled: true
                                })}
                                onChange={!loginConfig.disabled
                                    ? event => setLoginConfig({
                                        ...loginConfig,
                                        login: event.target.value
                                    })
                                    : () => null
                                }/>
                        </div>

                        <div className={styles.inputWrapper}>
                            <Input
                                onIconClick={passConfig.disabled
                                    ? () => onPassClick()
                                    : () => null
                                }
                                ref={passRef}
                                disabled={passConfig.disabled}
                                icon={'EditIcon'}
                                type={passConfig.type}
                                placeholder={'Пароль'}
                                value={passConfig.pass}
                                onBlur={() => setPassConfig({
                                    ...passConfig,
                                    type: 'password',
                                    disabled: true
                                })}
                                onChange={!passConfig.disabled
                                    ? event => setPassConfig({
                                        ...passConfig,
                                        pass: event.target.value
                                    })
                                    : () => null
                                }/>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
}
