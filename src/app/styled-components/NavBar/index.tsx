import React from 'react';
import styled from 'styled-components';
import { deviceMax as device } from '../size';
import LogOutIcon from '@images/Logout.svg';

export const StyledNavBar = styled.div`
  height: 100vh;
  max-width: 280px;
  min-width: 280px;
  background: rgba(16, 16, 16, 1);
  border-right: 1px solid white;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
  .logo-container {
    width: 100%;
    height: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
    border-bottom: 1px solid white;
    img {
      width: 48px;
      height: auto;
    }
    h1 {
      text-transform: uppercase;
      font-size: 26px;
      margin: 0;
    }
    h2 {
      font-size: 20px;
      margin: 0;
    }
  }
  .links-container {
    height: calc(100vh - 160px);
    width: 100%;
    border-right: 1px solid white;
    display: flex;
    align-items: center;
    flex-direction: column;
    a {
      padding: 1em 0;
      width: 100%;
      text-align: center;
      color: white;
      font-size: 16px;
      font-weight: 400;
      transition: all 0.2s linear;
      &:hover {
        background: rgba(0, 0, 0, 0.5);
        opacity: 0.75;
      }
    }
  }
`;

export const StyledExitButton = styled.div`
  width: 100%;
  height: 64px;
  border-top: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  cursor: pointer;
  transition: all 0.2s linear;
  span {
    color: white;
  }
  img {
    width: 24px;
    height: 24px;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.5);
    opacity: 0.75;
  }
`;

export const StyledActiveBarIcon = styled.div`
  background: black;
  padding: 0 1em;
  width: calc(100vw - 2em - 5px);
  height: 42px;
  display: none;
  justify-content: flex-end;
  img {
    width: 42px;
    height: 42px;
    cursor: pointer;
  }
  .navbar-icon {
    cursor: pointer;
    transition: all 0.2s linear;
  }
  @media (max-width: 728px) {
    display: flex;
    position: absolute;
  }
`;

export const ExitButton: React.FC<{ text: string; handler?: () => any }> = ({
  text,
  handler,
}) => {
  return (
    <StyledExitButton onClick={() => (handler ? handler() : undefined)}>
      <span>{text}</span>
      <img alt="exit" src={LogOutIcon} />
    </StyledExitButton>
  );
};
