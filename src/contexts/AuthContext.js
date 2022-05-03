import React, { createContext, useContext, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

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
function useAuth() {
  return useContext(AuthContext);
}
export function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
