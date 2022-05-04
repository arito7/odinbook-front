import React, { createContext, useContext, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Axios from 'axios';

const axios = Axios.default;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signin = (user, cb) => {
    setUser(user);
    cb();
  };

  const signout = (cb) => {
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
  const location = useLocation();
  const navigate = useNavigate();

  if (!auth.user) {
    axios
      .get(`http://localhost:5000/users/me`, { withCredentials: true })
      .then((res) => {
        auth.signin(res.data.user, () => {
          navigate('/');
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
