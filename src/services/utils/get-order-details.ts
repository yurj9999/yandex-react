import {URL_ORDER, URL_UPDATE_TOKEN} from '../constants';
import {getCookie, deleteCookie, setCookie} from './cookie-helper';

import {IItem} from '../../interfaces';

export const getOrderDetails = async (iDs: string[]): Promise<IItem | undefined> => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('authorization', getCookie('burgerAccessToken') as string);

    try {
        const request = await fetch(URL_ORDER, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              ingredients: iDs
            })
        });
    
        if (!request.ok) {
            const error: Error = await request.json();
            throw new Error(error.message);
        }

        return await request.json();
    } catch (error) {
        if (error.message === 'jwt expired') {
            deleteCookie('burgerAccessToken');
                
            try {
                const request = await fetch(URL_UPDATE_TOKEN, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({token: localStorage.getItem('burgerRefreshToken')})
                });
        
                if (!request.ok) {
                    throw new Error('Ошибка при запросе.');
                }
                
                const data = await request.json();
        
                setCookie('burgerAccessToken', data.accessToken);
                localStorage.setItem('burgerRefreshToken', data.refreshToken);
                
                return await getOrderDetails(iDs);
            } catch (error) {
                console.log(error.message);
            }
        } else {
            return error;
        }
    }
}
