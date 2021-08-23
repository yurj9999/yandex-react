export const getBurgerStatus = (status: string): 'Создан' | 'Готовится' | 'Выполнен' => {
    switch(status) {
        case 'created':
            return 'Создан';

        case 'pending':
            return 'Готовится';

        default:
            return 'Выполнен';
    }
};
