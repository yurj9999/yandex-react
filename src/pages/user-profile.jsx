import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {updateUserData, setUserFromServer} from '../services/actions/index';

import {ProfileLinks} from '../components/profile-links/profile-links';

import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './input-pages.module.css';

// костыль для ширины инпута
import './input-pages.css';

export const UserProfile = () => {
    const dispatch = useDispatch();

    const storeUserData = useSelector(store => store.user);

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const onSave = () => dispatch(updateUserData({...userData}));

    const onCancel = () => setUserData({
        name: storeUserData.user.name,
        email: storeUserData.user.email,
        password: ''
    });

    useEffect(() => {
        if (!storeUserData.user.name) {
            dispatch(setUserFromServer());
        } else {
            setUserData({
                name: storeUserData.user.name,
                email: storeUserData.user.email,
                password: ''
            });
        }
    }, [dispatch, storeUserData.user.name, setUserFromServer, storeUserData.user.email, storeUserData.exited]);

    return (
        <div className={styles.mainProfileWrapper}>
            <div className={styles.profileWrapper}>
                <div className={styles.linksWrapper}>
                    <ProfileLinks type={'profile'}/>
                </div>
                <div >
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
                            <Button type="primary" size="large" onClick={onSave}>Сохранить</Button>
                            <Button type="primary" size="large" onClick={onCancel}>Отменить</Button>
                        </div>
                    </div>
                </div>        
            </div>
        </div> 
    );
}
