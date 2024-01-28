import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FormLogIn from '../../app/component/Auth/FormLogIn';
import FormSignUp from '../../app/component/Auth/FormSignUp';
import { AuthStyled } from '../../app/styled-components/Auth';
import logo from '../../static/images/logo.svg';
// import Error404 from "../Error404";

const Auth = () => {
  return (
    <AuthStyled>
      <img alt="logo" src={logo} className="auth-back-logo" />
      <Routes>
        <Route path="*" element={<FormLogIn />} />
      </Routes>
    </AuthStyled>
  );
};

export default Auth;
