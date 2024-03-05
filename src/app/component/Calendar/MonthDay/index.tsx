import React from 'react';
import { isCurrentDay, isSelectedMonth } from '@app/helpers/calendar-helpers';
import {
  CellWrapper,
  CurrentDay,
  DayWrapper,
  RowInCell,
  ShowDayWrapper,
} from '@styled/Calendar';
import moment from 'moment';

export const MonthDay: React.FC<{
  dayItem: moment.Moment;
  today: moment.Moment;
  limitDay?: moment.Moment;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setDay: (date: moment.Moment) => void;
  useLimit?: boolean;
}> = ({ dayItem, today, limitDay, setActive, setDay, useLimit }) => {
  let active = false;
  if (useLimit) {
    if (limitDay) {
      active =
        !moment().isSameOrBefore(dayItem, 'day') || !limitDay.isAfter(dayItem);
    } else {
      active = !moment().isSameOrBefore(dayItem, 'day');
    }
  }

  return (
    <CellWrapper
      isWeekday={dayItem.day() === 6 || dayItem.day() === 0}
      key={dayItem.unix()}
      isSelectedMonth={isSelectedMonth(dayItem, today)}
      onDoubleClick={() => {
        if (!active) {
          setDay(dayItem);
          setActive(false);
        }
      }}
    >
      <RowInCell justifyContent={'flex-end'}>
        <ShowDayWrapper isActiveDay={active}>
          <DayWrapper
            className="day-wrapper-desktop"
            active={active}
            onClick={() => {
              if (!active) {
                setDay(dayItem);
                setActive(false);
              }
            }}
          >
            {dayItem.format('dd')}
          </DayWrapper>
          <DayWrapper
            active={active}
            onClick={() => {
              if (!active) {
                setDay(dayItem);
                setActive(false);
              }
            }}
          >
            {isCurrentDay(dayItem) ? (
              <CurrentDay>{dayItem.format('D')}</CurrentDay>
            ) : (
              dayItem.format('D')
            )}
          </DayWrapper>
        </ShowDayWrapper>
      </RowInCell>
    </CellWrapper>
  );
};
