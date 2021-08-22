import {useState, useEffect, FC, ReactElement, SyntheticEvent} from 'react';
import {useSelector, useDispatch} from '../services/utils/modified-react-hooks';

import {updateUserData, setUserFromServer} from '../services/actions/index';

import {ProfileLinks} from '../components/profile-links/profile-links';

import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './input-pages.module.css';

// костыль для ширины инпута
import './input-pages.css';

export const UserProfile: FC<{}> = (): ReactElement => {
    const dispatch = useDispatch();
    const storeUserData = useSelector(store => store.user);

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onSave = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(updateUserData({...userData}));
    }

    const onCancel = () => setUserData({
        name: storeUserData.user.name as string,
        email: storeUserData.user.email,
        password: ''
    });

    useEffect(() => {
        if (!storeUserData.user.name && !storeUserData.isExit) {
            dispatch(setUserFromServer());
        } else {
            setUserData({
                name: storeUserData.user.name as string,
                email: storeUserData.user.email,
                password: ''
            });
        }
    }, [dispatch, storeUserData.user.name, storeUserData.user.email, storeUserData.isExit]);

    return (
        <div className={styles.mainProfileWrapper}>
            <div className={styles.profileWrapper}>
                <div className={styles.linksWrapper}>
                    <ProfileLinks/>
                </div>
                
                <form onSubmit={onSave}>
                    <div className={styles.inputsWrapper}>
                        <div className={styles.inputWrapper}>
                            <Input
                                icon={'EditIcon'}
                                type={'text'}
                                placeholder={'Имя'}
                                value={userData.name}
                                onChange={
                                    (event) => setUserData({
                                        ...userData,
                                        name: event.target.value
                                    })
                                }/>
                        </div>

                        <div className={styles.inputWrapper}>
                            <Input
                                icon={'EditIcon'}
                                type={'text'}
                                placeholder={'Логин'}
                                value={userData.email}
                                onChange={
                                    (event) => setUserData({
                                        ...userData,
                                        email: event.target.value
                                    })
                                }/>
                        </div>

                        <div className={styles.inputWrapper}>
                            <Input
                                icon={'EditIcon'}
                                type={userData.password ? 'password' : 'text'}
                                placeholder={'Пароль'}
                                value={userData.password}
                                onChange={
                                    (event) => setUserData({
                                        ...userData,
                                        password: event.target.value
                                    })
                                }/>
                        </div>

                        <div className={styles.buttonsWrapper}>
                            <Button type="primary" size="large">Сохранить</Button>
                            <Button type="primary" size="large" onClick={onCancel}>Отменить</Button>
                        </div>
                    </div>
                </form>   
            </div>
        </div> 
    );
}
