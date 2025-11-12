import React, { useEffect, useState, createContext, useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Slot, useRouter, usePathname } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Tipos
interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthResponse {
  access_token: string;
  user: User;
}

interface ErrorResponse {
  message: string;
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// URL da API - Backend hospedado no Render
const API_URL = 'https://pi-3sem-backend.onrender.com';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega dados salvos ao iniciar
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
      setToken(null);
      setUser(null);
      await AsyncStorage.removeItem('@App:token');
      await AsyncStorage.removeItem('@App:user');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}

function AuthGate() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    const publicRoutes = ['/login', '/register'];
    const current = pathname ?? '';

    if (!user && !publicRoutes.includes(current)) {
      router.replace('/login');
    } else if (user && publicRoutes.includes(current)) {
      router.replace('/tabs');
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}

export default function Layout() {
  return (
    <PaperProvider>
      <AuthProvider>
        <AuthGate />
      </AuthProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});