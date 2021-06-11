import {URL_ORDER} from '../constants';

export const getOrderDetails = async (iDs) => {
    try {
        const request = await fetch(URL_ORDER, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ingredients: iDs
            })
        });
    
        if (!request.ok) {
            throw new Error('Ошибка при запросе.');
        }
    
        return await request.json();
    } catch (error) {
        return error; 
    }
}
