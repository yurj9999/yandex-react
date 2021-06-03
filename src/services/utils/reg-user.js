import {URL_REGISTRATION} from '../constants';

export const regUser = async ({name, email, password}) => {
    try {
        const request = await fetch(URL_REGISTRATION, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                name,
                password
                
                /*email: "test-data@yandex.ru", 
                password: "password", 
                name: "Username"*/
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
