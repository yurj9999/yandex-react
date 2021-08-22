import {useState, useRef, FC, ReactElement, SyntheticEvent} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';

import {useDispatch} from '../services/utils/modified-react-hooks';
import {setUser} from '../services/actions/index';

import {Logo, Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import {IPasswordState} from '../interfaces';

import styles from './input-pages.module.css';

// костыль для ширины инпута
import './input-pages.css';

interface ILocation {
    from: {
        pathname: string;
    }
}

export const Autorization: FC<{}> = (): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<ILocation>();

    const passRef = useRef(null);

    const [email, setEmail] = useState('');

    const [passwordConfig, setPasswordConfig] = useState<IPasswordState>({
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

    const onLogin = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        (dispatch(setUser({
            email, 
            password: passwordConfig.value 
        }, 'authorization')) as unknown as Promise<Error>)
            .then(result => {
                if (result instanceof Error) throw new Error();

                if (location.state?.from?.pathname === '/start-order' || history.action === 'POP' || !location.state?.from) {
                    history.push('/');
                } else {
                    history.push(location.state.from.pathname);
                }                
            })
            .catch(error => console.log(error));
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <Logo/>
            </div>   
            <p className={`text text_type_main-medium ${styles.title}`}>Вход</p>

            <form onSubmit={onLogin}>
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
            </form>

            <div className={`mb-4 ${styles.footer}`}>
                <p className={`text text_type_main-default ${styles.footerInfo}`}>Вы — новый пользователь?</p>
                <Link to="/register" className={`text text_type_main-default ml-2 ${styles.footerEnter}`}>Зарегистрироваться</Link>
            </div>

            <div className={styles.footer}>
                <p className={`text text_type_main-default ${styles.footerInfo}`}>Забыли пароль?</p>
                <Link to="/forgot-password" className={`text text_type_main-default ml-2 ${styles.footerEnter}`}>Восстановить пароль</Link>
            </div>
        </div>
    );
}
