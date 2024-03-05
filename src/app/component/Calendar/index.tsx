import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import CalendarGrid from './CalendarGrid';
import Monitor from './Monitor';
import moment from 'moment';
import { CalendarOpenStyled } from '@styled/Calendar';

const CalendarOpen: React.FC<{
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  limitDay?: moment.Moment;
  useLimit?: boolean;
  setDay: (date: moment.Moment) => void;
}> = ({ active, setActive, limitDay, setDay, useLimit }) => {
  const [today, setToday] = useState(moment().locale('ru'));
  const prevHandler = () =>
    setToday((prev) => prev.clone().subtract(1, 'month'));
  const todayHandler = () => setToday(moment().locale('ru'));
  const nextHandler = () => setToday((prev) => prev.clone().add(1, 'month'));
  return (
    <CalendarOpenStyled>
      {/* <div
        className={active ? 'modal' : 'modal_active'}
        style={
          !active
            ? {
                display: 'none',
              }
            : undefined
        }
        onClick={() => setActive(false)}
      > */}
      <div
        className={active ? 'modal_content' : 'modal_content_active'}
        onClick={(e) => e.stopPropagation()}
      >
        <Monitor
          nextHandler={nextHandler}
          prevHandler={prevHandler}
          today={today}
          todayHandler={todayHandler}
        />
        <CalendarGrid
          today={today}
          setActive={setActive}
          limitDay={limitDay}
          useLimit={useLimit}
          setDay={setDay}
        />
      </div>
      {/* </div> */}
    </CalendarOpenStyled>
  );
};

export default observer(CalendarOpen);
