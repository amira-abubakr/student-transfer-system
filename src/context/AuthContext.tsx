import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'Branch Admin' | 'Reviewer' | 'Super Admin';

interface User {
  name: string;
  email: string;
  role: UserRole;
  branch: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string, role: UserRole): boolean => {
    if (!email) return false;
    setUser({
      name: 'Dr. Sarah',
      email,
      role,
      branch: 'Cairo Branch',
    });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
