export const getBurgerStatus = (status) => {
    switch(status) {
        case 'created':
            return 'Создан';

        case 'pending':
            return 'Готовится';

        default:
            return 'Выполнен';
    }
};
