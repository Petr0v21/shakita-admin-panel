import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/main.css';
import Error404 from './pages/Error404';
import Auth from './pages/Auth';
import BonusTicket from './pages/BonusTicket';
import Monitor from './pages/Monitor';
import Applications from './pages/Applications';
import Accounts from './pages/Accounts';
import Dashboard from './pages/Dashboard';
import Bonus from './pages/Bonus';
import AccountForm from '@component/Forms/User';
import ApplicationForm from '@component/Forms/Application';
import FormBonus from '@component/Forms/Bonus';
import FormBonusTicket from '@component/Forms/BonusTicket';
import ModalProvider from '@component/Modal';
import { useAuth } from './hooks/auth.hook';
import AuthContext from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  const {
    token,
    refreshToken,
    login,
    logout,
    username,
    isAuthenticated,
    checkAuth,
  } = useAuth();
  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated, token);
  }, [isAuthenticated, logout]);
  return (
    <AuthContext.Provider
      value={{
        refreshToken,
        token: token,
        login,
        logout,
        username,
        isAuthenticated,
        checkAuth,
      }}
    >
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            {isAuthenticated ? (
              <Route path="/" element={<Monitor />}>
                <Route element={<Dashboard />} index />
                <Route path="/dashboard" element={<Dashboard />} index />
                <Route path="/applications" element={<Applications />} />
                <Route
                  path="/applications/:id"
                  element={<ApplicationForm type="UPDATE" />}
                />
                <Route
                  path="/applications/create"
                  element={<ApplicationForm type="CREATE" />}
                />
                <Route path="/accounts" element={<Accounts />} />
                <Route
                  path="/accounts/:id"
                  element={<AccountForm type="UPDATE" />}
                />
                <Route
                  path="/accounts/create"
                  element={<AccountForm type="CREATE" />}
                />
                <Route path="/bonus" element={<Bonus />} />
                <Route
                  path="/bonus/:id"
                  element={<FormBonus type="UPDATE" />}
                />
                <Route
                  path="/bonus/create"
                  element={<FormBonus type="CREATE" />}
                />
                <Route path="/bonus-ticket" element={<BonusTicket />} />
                <Route
                  path="/bonus-ticket/:code"
                  element={<FormBonusTicket type="UPDATE" />}
                />
                <Route
                  path="/bonus-ticket/create"
                  element={<FormBonusTicket type="CREATE" />}
                />
              </Route>
            ) : (
              <Route path="*" element={<Auth />} />
            )}
            <Route path="/*" element={<Error404 />} />
          </Routes>
          <ToastContainer
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BrowserRouter>
      </ModalProvider>
    </AuthContext.Provider>
  );
};

export default App;
