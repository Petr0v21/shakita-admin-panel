import moment from 'moment';

export const isCurrentDay = (day: any) => moment().isSame(day, 'day');
export const isSelectedMonth = (day: any, today: moment.Moment) =>
  today.isSame(day, 'month');
