import moment from 'moment';
import React from 'react';
import {
  ButtonsWrapperMonitor,
  ButtonWrapper,
  ButtonWrapperMonitor,
  DateText,
  DivWrapper,
  TextWrapper,
  TitleWrapper,
  TodayButton,
} from '@styled/Calendar';

const Monitor: React.FC<{
  today: moment.Moment;
  prevHandler: () => void;
  nextHandler: () => void;
  todayHandler: () => void;
}> = ({ today, prevHandler, nextHandler, todayHandler }) => (
  <DivWrapper>
    <ButtonsWrapperMonitor>
      <ButtonWrapperMonitor onClick={prevHandler}> &lt; </ButtonWrapperMonitor>
      <DateText>
        <TitleWrapper>{today.format('MMMM')}</TitleWrapper>
        <TextWrapper>{today.format('YYYY')}</TextWrapper>
      </DateText>
      <ButtonWrapperMonitor onClick={nextHandler}> &gt; </ButtonWrapperMonitor>
    </ButtonsWrapperMonitor>
    <TodayButton onClick={todayHandler}>Today</TodayButton>
  </DivWrapper>
);

export default Monitor;
