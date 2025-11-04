import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, User, AuthResponse } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (name: string, email: string, password: string) => Promise<AuthResponse>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Load user and token from localStorage on mount
    const storedToken = authApi.getToken();
    const storedUser = authApi.getCurrentUser();
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    const data = await authApi.login(email, password);
    setToken(data.token);
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    });
    return data;
  };

  const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const data = await authApi.register(name, email, password);
    setToken(data.token);
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    });
    return data;
  };

  const logout = () => {
    authApi.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
