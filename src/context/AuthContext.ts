import { createContext } from 'react';

function noop() {}

interface AppContextInterface {
  token: string | null;
  refreshToken: string | null;
  username: string | null;
  login: Function;
  logout: Function;
  isAuthenticated: boolean;
  checkAuth: Function;
}

//   const AppCtx = createContext<AppContextInterface | null>(null);

const AuthContext = createContext<AppContextInterface | null>({
  token: null,
  refreshToken: null,
  username: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
  checkAuth: noop,
});

export default AuthContext;
