import dayjs from 'dayjs';

export const DateRange = {
    lastYear: {
        start: dayjs().subtract(1, 'year').startOf('year').valueOf(),
        end: dayjs().subtract(1, 'year').endOf('year').valueOf(),
    },
    today: {
        start: dayjs().startOf('day').valueOf(),
        end: dayjs().endOf('day').valueOf(),
    },
}