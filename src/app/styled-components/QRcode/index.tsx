import styled from 'styled-components';

export const QRcodeButtonStyled = styled.div`
  padding: 0.5em 1em;
  width: calc(280px - 2em);
  max-height: 52px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: rgba(253, 48, 48, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  span {
    color: white;
    font-size: 15px;
    font-weight: 500;
  }
  img {
    width: 36px;
    height: 36px;
  }

  transition: all 0.2s linear;
  &:hover {
    background-color: rgba(253, 48, 48, 0.7);
  }
  &:active {
    background-color: rgba(253, 48, 48, 0.5);
    border: 1px solid #f7f5ff;
  }
`;
