import {URL_RESET_PASSWORD} from '../constants';

export const resetPass = async ({code, password}) => {
    try {
        const request = await fetch(URL_RESET_PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code,
                password
            })
        });

        if (!request.ok) {
            throw new Error('Ошибка при запросе.');
        }

        const data = await request.json();

        // пока просто отображаем в консоли положительный ответ
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
}
