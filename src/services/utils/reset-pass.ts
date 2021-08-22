import {URL_RESET_PASSWORD} from '../constants';

interface IData {
    password: string;
    token: string;
}

type TResetPass = (params: IData) => Promise<Error | undefined>;

export const resetPass: TResetPass = async ({password, token}) => {
    try {
        const request = await fetch(URL_RESET_PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                token
            })
        });

        if (!request.ok) {
            throw new Error('Ошибка при запросе.');
        }
    } catch (error) {
        console.log(error.message);
        return error;
    }
}
