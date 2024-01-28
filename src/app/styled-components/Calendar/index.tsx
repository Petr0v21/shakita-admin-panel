import styled from 'styled-components';

type CalendarStyledType = {
  isWeekday?: boolean;
  isSelectedMonth?: boolean;
  justifyContent?: string;
  pr?: number;
  inCurentDay?: boolean;
  danger?: boolean;
};

export const CellWrapper = styled.div<CalendarStyledType>`
  background-color: ${(props) => (props.isWeekday ? '#27282A' : '#1E1F21')};
  color: ${(props) => (props.isSelectedMonth ? '#DDDDDD' : '#555759')};
  // min-width: 20px;
  // min-height: auto;
  @media (min-width: ${925}px) {
    min-height: 80px;
    min-width: 120px;
  }
`;

export const RowInCell = styled.div<CalendarStyledType>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'flex-start'};
  ${(props) => props.pr && `padding-right: ${props.pr * 8}px`}
  @media (max-width: 925px) {
    align-items: center;
  }
`;

export const EventListWrapper = styled('ul')`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const EventListItemWrapper = styled('li')`
  padding-left: 2px;
  padding-right: 2px;
  margin-bottom: 2px;
  display: flex;
`;

export const EventItemWrapper = styled('button')`
  position: relative;
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 114px;
  border: unset;
  color: #dddddd;
  cursor: pointer;
  margin: 0;
  padding: 0;
  text-align: left;
  background-color: #5d5f63;
  border: 1px solid #5d5f63;
  border-radius: 2px;
`;

export const EventTitle = styled.input<CalendarStyledType>`
  padding: 8px 14px;
  font-size: 0.85rem;
  ${(props) => (props.inCurentDay ? 'width: 100%;' : '')}
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: 1px solid #464648;
`;

export const EventBody = styled.textarea<CalendarStyledType>`
  padding: 8px 14px;
  font-size: 0.85rem;
  ${(props) => (props.inCurentDay ? 'width: 100%;' : '')}
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: 1px solid #464648;
  resize: none;
  height: 60px;
`;

export const ButtonsWrapper = styled.div<CalendarStyledType>`
  padding: 8px 14px;
  display: flex;
  // justify-content: flex-end;
  justify-content: space-evenly;
`;

export const ButtonWrapper = styled.div<CalendarStyledType>`
  color: ${(props) => (props.danger ? '#f00' : '#dddddd')};
  border: 1px solid ${(props) => (props.danger ? '#f00' : '#dddddd')};
  border-radius: 2px;
  font-size: 14px;
  padding: 8px 14px;
  color: #dddddd;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  &:not(:last-child) {
    margin-right: 2px;
  }
  &:hover {
    background: black;
    color: ${(props) => (props.danger ? '#f00' : 'white')};
  }
`;

export const ShadowWrapper = styled('div')`
  min-width: 850px;
  height: 702px;
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 0 1px #1a1a1a, 0 8px 20px 6px #888;
  display: flex;
  flex-direction: column;
`;

export const FormPositionWrapper = styled('div')`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormWrapper = styled(ShadowWrapper)`
  width: 320px;
  min-width: 320px;
  height: auto;
  background-color: #1e1f21;
  color: #dddddd;
  box-shadow: unset;
`;

export const DatePicker = styled('input')`
  width: 60px;
  height: 40px;
  border: 0;
  margin-right: 8px;
  background: rgba(0, 0, 0, 0);
  &:focus-visible {
    outline: 0px solid crimson;
  }

  &::-webkit-datetime-edit-month-field {
    visibility: hidden;
    width: 0;
  }
  &::-webkit-datetime-edit-day-field {
    visibility: hidden;
    width: 0;
  }
  &::-webkit-datetime-edit-year-field {
    visibility: hidden;
    width: 0;
  }

  &::-webkit-calendar-picker-indicator {
    visibility: visible;
    font-size: 18px;
    background-color: #ffffff;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 3px;
  }
`;

export const TextWrapper = styled('span')`
  font-size: 24px;
  @media (min-width: 320px) {
    font-size: 0.85em;
  }
  @media (min-width: 425px) {
    font-size: 1em;
  }
  @media (min-width: 925px) {
    font-size: 24px;
  }
`;

export const TitleWrapper = styled(TextWrapper)`
  font-weight: 700;
  margin-right: 8px;
  margin-left: 8px;
`;

export const OpenFullFormButton = styled('span')`
  width: 40px;
  height: 40px;
  font-size: 24px;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const TimeInput = styled('input')`
  padding: 8px 14px;
  font-size: 0.85rem;
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: 1px solid #464648;
  &:focus-visible {
    outline: 0px solid crimson;
  }
  &::-webkit-calendar-picker-indicator {
    visibility: visible;
    font-size: 18px;
    background-color: #ffffff;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 3px;
  }
`;

export const DataInput = styled('input')`
  padding: 8px 14px;
  font-size: 0.85rem;
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: 1px solid #464648;
  &:focus-visible {
    outline: 0px solid crimson;
  }
  &::-webkit-calendar-picker-indicator {
    visibility: visible;
    font-size: 18px;
    background-color: #ffffff;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 3px;
  }
`;

export const CalendarStyled = styled.div`
  display: flex;
  gap: 1em;
  .handChoose {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
`;

export const CalendarOpenStyled = styled.div`
  .modal {
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
    transform: scale(1);
  }

  .modal_active {
    transform: scale(0);
  }

  .modal_content {
    padding: 1em;
    border-radius: 12px;
    background-color: black;
    border: 2px solid #a4a6a9;
  }
  .modal_content_active {
    display: flex;
    justify-content: space-between;
  }
`;

export const DayWrapper = styled.div<{ active: boolean }>`
  height: 31px;
  width: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  cursor: ${(props) => (props.active ? 'default' : 'pointer')};
  @media (min-width: 320px) {
    height: 31px;
    width: 31px;
  }
  @media (min-width: 375px) {
    height: 36px;
    width: 36px;
  }
  @media (min-width: 425px) {
    height: 38px;
    width: 38px;
  }
  @media (min-width: 600px) {
    height: 42px;
    width: 42px;
  }
  @media (min-width: 768px) {
    height: 45px;
    width: 45px;
  }
  @media (min-width: 925px) {
    height: 31px;
    width: 31px;
  }
`;

export const CurrentDay = styled.div`
  height: 100%;
  width: 100%;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ShowDayWrapper = styled.div<{ isActiveDay?: boolean }>`
  display: flex;
  justify-content: space-between;
  color: ${(props) => (props.isActiveDay ? ' #353535' : 'white')};
  @media (max-width: 925px) {
    .day-wrapper-desktop {
      display: none;
    }
  }
`;

export const DivWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  background-color: #1e1f21;
  color: #dcdddd;
  padding: 16px;
  position: relative;
`;

export const ButtonsWrapperMonitor = styled('div')`
  display: flex;
  align-items: center;
  gap: 1%;
`;

export const DateText = styled('div')`
  width: 14em;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 320px) {
    width: 6em;
  }
  @media (min-width: 375px) {
    width: 8em;
  }
  @media (min-width: 768px) {
    width: 10em;
  }
  @media (min-width: 925px) {
    width: 14em;
  }
`;

export const ButtonsCenterWrapper = styled(ButtonsWrapper)`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

export const ButtonWrapperMonitor = styled('button')`
  border: unset;
  background-color: #27282a;
  border: 1px solid #565759;
  height: 20px;
  border-radius: 4px;
  color: #a4a6a9;
  outline: unset;
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 2px;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TodayButton = styled.div`
  border: unset;
  background-color: #27282a;
  border: 1px solid #565759;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a4a6a9;
  padding: 0.5em 1em;
  cursor: pointer;
  @media (min-width: 320px) {
    font-size: 10px;
  }
  @media (min-width: 768px) {
    font-size: 14px;
  }
  @media (min-width: 925px) {
    font-size: 18px;
  }
`;
