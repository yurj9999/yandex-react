import {URL_RECOVERY_PASSWORD} from '../constants';

export const recoveryPass = async (email) => {
    try {
        const request = await fetch(URL_RECOVERY_PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
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
