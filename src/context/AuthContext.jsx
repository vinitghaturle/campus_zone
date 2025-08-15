import React, { createContext, useContext, useEffect, useState } from 'react';
import { account } from '../services/appwrite';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // on mount, try to fetch current user
  useEffect(() => {
    (async () => {
      try {
        const me = await account.get();
        setUser(me);
      } catch (_) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signup = async (email, password, name) => {
    await account.create('unique()', email, password, name);
    // auto-login after signup (optional)
    await account.createEmailSession(email, password);
    const me = await account.get();
    setUser(me);
  };

  const login = async (email, password) => {
    await account.createEmailSession(email, password);
    const me = await account.get();
    setUser(me);
  };

  const logout = async () => {
    await account.deleteSessions(); // delete all sessions
    setUser(null);
  };

  const value = { user, loading, signup, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}