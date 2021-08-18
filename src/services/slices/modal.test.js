import {reducer} from './modal';

const initialState = {
    number: null,
    name: null,
    status: '',
    details: ''
};

describe('modal reducer tests', () => {
    test('should return the initial state', () => expect(reducer(undefined, {})).toEqual(initialState));

    test('should handle modal/setStartInfo', () => expect(reducer(initialState, {
        type: 'modal/setStartInfo'
    })).toEqual({
        number: null,
        name: 'Заказ принят',
        status: 'Ваш заказ начали готовить',
        details: 'Дождитесь готовности на орбитальной станции'
    }));

    test('should handle modal/setEndInfo', () => expect(reducer(initialState, {
        type: 'modal/setEndInfo',
        payload: {
            number: 1,
            name: 'test'
        }
    })).toEqual({
        number: 1,
        name: 'test',
        status: 'Заказ готов',
        details: 'Приятного аппетита'
    }));
});
