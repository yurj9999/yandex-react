import {
    MINUTES_IN_HOUR,
    MILLISECONDS_IN_DAY,
    FIVE_DAYS,
    ELEVEN_DAYS,
    FIFTEEN_DAYS,
    WITHOUT_ZERO_MAX_TIME
} from '../../services/constants';

export const getStrDataCreated = (createdAt: string): string => {
    const checkForZeroes = (timeCount: number) => timeCount < WITHOUT_ZERO_MAX_TIME ? `0${timeCount}` : timeCount;

    const getDaysInterval = (nowDate: number, agoDate: Date) => {
        const days = Math.round((nowDate - new Date(agoDate).getTime()) / MILLISECONDS_IN_DAY);
        const lastDaySymbol = parseInt(days.toString().substr(days.toString().length - 1, 1));

        if (days === 0) {
            return 'Сегодня';
        } else if (days >= ELEVEN_DAYS && days < FIFTEEN_DAYS) {
            return `${days} дней назад`;
        } else {
            if (lastDaySymbol >= FIVE_DAYS) {
                return `${days} дней назад`;
            }
            if (lastDaySymbol > 1 && lastDaySymbol < FIVE_DAYS) {
                return `${days} дня назад`;
            }
            if (lastDaySymbol === 1) {
                return `${days} день назад`;
            }
        }
    };

    const agoDate = new Date(createdAt);

    const daysAgo = getDaysInterval(new Date().getTime(), agoDate);
    const hours = checkForZeroes(agoDate.getHours());
    const minutes = checkForZeroes(agoDate.getMinutes());
    const gmt = `i-GMT${agoDate.getTimezoneOffset() / MINUTES_IN_HOUR}`;

    return `${daysAgo} ${hours}:${minutes} ${gmt}`;
}
