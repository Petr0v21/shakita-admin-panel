import styled from 'styled-components';
import { deviceMax as device } from '../size';

export const AuthStyled = styled.div`
  min-height: calc(90vh - 15vh);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  .auth-back-logo {
    max-width: 360px;
    min-width: 180px;
    height: auto;
    position: absolute;
    z-index: -1;
    opacity: 0.1;
  }

  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 5em;
    @media ${device.mobileL} {
      padding: 1em;
    }
  }

  a {
    color: white;
  }
`;

export const GoogleButtonStyled = styled.div`
  margin: 1em;
  padding: 0.75em 1em;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 12px;
  border: 1px solid white;
  gap: 1em;
  cursor: pointer;
  img {
    width: 25px;
    height: 25px;
  }
  @media ${device.tablet} {
    padding: 1em;
    gap: 1em;
    font-size: 14px;
    img {
      width: 20px;
      height: 20px;
    }
  }
`;
