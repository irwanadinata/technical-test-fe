"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut, User, getIdToken } from "firebase/auth";

interface AuthContextProps {
  user: User | null;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  logout: async () => { },
  getToken: async () => null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const getToken = async () => {
    if (auth.currentUser) {
      return await getIdToken(auth.currentUser);
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, logout, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};
