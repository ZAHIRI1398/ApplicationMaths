import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User } from '../lib/types';
import { getCurrentUser, login as loginUser, register as registerUser, logout as logoutUser } from '../lib/auth';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (name: string, password: string) => Promise<boolean>;
  register: (name: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const current = await getCurrentUser();
    setUser(current);
  }, []);

  useEffect(() => {
    (async () => {
      await refresh();
      setLoading(false);
    })();
  }, [refresh]);

  const login = useCallback(async (name: string, password: string): Promise<boolean> => {
    const current = await loginUser(name, password);
    if (current) {
      setUser(current);
      return true;
    }
    return false;
  }, []);

  const register = useCallback(async (name: string, password: string): Promise<void> => {
    const newUser = await registerUser(name, password);
    setUser(newUser);
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    await logoutUser();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
