import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipos
interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

interface AuthResponse {
  access_token: string;
  user: User;
}

interface ErrorResponse {
  message: string;
}

// Crie o contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // URL da sua API - AJUSTE AQUI para o seu backend
  const API_URL = 'http://localhost:3000'; // Para emulador Android use: http://10.0.2.2:3000

  // Carrega os dados salvos quando o app inicia
  useEffect(() => {
    loadStorageData();
  }, []);

  const loadStorageData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('@App:token');
      const storedUser = await AsyncStorage.getItem('@App:user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do storage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // Trata erros do backend
      if (!response.ok) {
        const errorData = data as ErrorResponse;
        throw new Error(errorData.message || 'Erro ao fazer login');
      }

      const authData = data as AuthResponse;

      // Salva no estado
      setToken(authData.access_token);
      setUser(authData.user);

      // Persiste no AsyncStorage
      await AsyncStorage.setItem('@App:token', authData.access_token);
      await AsyncStorage.setItem('@App:user', JSON.stringify(authData.user));
    } catch (error) {
      console.error('Erro no signIn:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Limpa o estado
      setToken(null);
      setUser(null);

      // Remove do AsyncStorage
      await AsyncStorage.removeItem('@App:token');
      await AsyncStorage.removeItem('@App:user');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn,
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
};