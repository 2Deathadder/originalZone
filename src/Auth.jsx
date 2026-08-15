import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(localStorage.getItem('oz-admin-auth') === 'true');
  const login = (u, p) => { 
    if (u === 'admin' && p === 'admin') { 
      setAdmin(true); 
      localStorage.setItem('oz-admin-auth', 'true'); 
      return true; 
    } 
    return false; 
  };
  const logout = () => { 
    setAdmin(false); 
    localStorage.removeItem('oz-admin-auth'); 
  };
  return <AuthContext.Provider value={{admin, login, logout}}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
