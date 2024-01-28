import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../static/images/logo.svg';

const StyledErrorPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    position: fixed;
    z-index: -1;
    opacity: 0.2;
  }
  .error-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    label {
      color: white;
      font-size: 1em;
      @media (max-width: 425px) {
        font-size: 0.75em;
      }

      a {
        color: red;
        font-size: 1.5em;
        font-weight: 600;
      }
    }
    .error-title {
      font-size: 8em;
      font-weight: 700;
    }
  }
`;

const Error404 = () => {
  return (
    <StyledErrorPage>
      <img alt="logo" src={logo} />
      <div className="error-content">
        <label className="error-title">404</label>
        <label>
          Перейдите на <Link to="/">Главною</Link> страницу
        </label>
      </div>
    </StyledErrorPage>
  );
};

export default Error404;
