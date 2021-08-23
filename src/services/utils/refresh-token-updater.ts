import {URL_UPDATE_TOKEN} from '../constants';

import {setCookie} from './cookie-helper';

interface IResult {
    accessToken: string;
    refreshToken: string;
    success: boolean;
}

export const refreshTokenUpdater = async (dispatcher: Function, action: Function): Promise<IResult> => {
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
        
        const data: IResult = await request.json();

        setCookie('burgerAccessToken', data.accessToken);
        localStorage.setItem('burgerRefreshToken', data.refreshToken);

        dispatcher(action(data));

        return data;
    } catch (error) {
        throw new Error();
    }
}
