import React from 'react';
import { MonthDay } from '../MonthDay';

export const MonthDaysList: React.FC<{
  startDay: moment.Moment;
  today: moment.Moment;
  limitDay?: moment.Moment;
  useLimit?: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setDay: (date: moment.Moment) => void;
}> = ({ startDay, today, limitDay, setActive, setDay, useLimit }) => {
  const day = startDay.clone().subtract(1, 'day');
  const daysMap = [...Array(42)].map(() => day.add(1, 'day').clone());
  return (
    <>
      {daysMap.map((dayItem) => (
        <MonthDay
          today={today}
          key={dayItem.toString()}
          dayItem={dayItem}
          limitDay={limitDay}
          setActive={setActive}
          setDay={setDay}
          useLimit={useLimit}
        />
      ))}
    </>
  );
};
