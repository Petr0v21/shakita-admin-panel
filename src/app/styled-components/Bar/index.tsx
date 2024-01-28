import styled from 'styled-components';

export const BarStyled = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(34, 34, 34, 1);
  border-radius: 8px;
  padding: 1em;
  h3 {
    margin: 0;
  }
`;

export const BarItemStyled = styled.div`
  display: flex;
  width: 280px;
  border-radius: 8px;
  margin-top: 1em;
  position: relative;
  background: rgba(0, 0, 0, 0.25);
  border: 2px solid rgb(41, 41, 41);
  color: white;
  text-align: center;
  .statistic-item-main-content {
    padding: 0.5em;
    width: 70%;
    h6 {
      margin: 0;
      font-size: 0.6em;
      font-weight: 500;
      text-align: start;
      padding-left: 0.5em;
    }
    span {
      margin: 0;
      font-size: 1.6em;
      font-weight: 700;
    }
  }
  .statistic-item-details {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: inherit; //????
    background: rgba(0, 0, 0, 0.25);
  }
`;
