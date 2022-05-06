import React, { createContext, useContext, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from '../configs/axios';
import local from '../helpers/localStorage';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signin = (user, cb) => {
    setUser(user);
    cb();
  };

  const signout = (cb) => {
    local.delJwt();
    setUser(null);
    cb();
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }) {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!auth.user) {
    const jwt = local.getJwt();
    if (jwt) {
      axios.get('/users/me').then((res) => {
        if (res.data.success) {
          auth.signin(res.data.user, () => {
            navigate('/');
          });
        }
      });
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
