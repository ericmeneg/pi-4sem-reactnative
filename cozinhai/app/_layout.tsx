import React, { useEffect, useState, createContext, useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Slot, useRouter, usePathname } from "expo-router";
import { PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const API_URL = "https://pi-3sem-backend.onrender.com";

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
      let storedToken = await AsyncStorage.getItem("@App:token");
      let storedUser = await AsyncStorage.getItem("@App:user");

      // Se não encontrou no AsyncStorage, tenta no localStorage (web)
      if (
        (!storedToken || !storedUser) &&
        typeof window !== "undefined" &&
        window.localStorage
      ) {
        storedToken = window.localStorage.getItem("@App:token");
        storedUser = window.localStorage.getItem("@App:user");
      }

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        console.log(
          "Usuário carregado do storage:",
          JSON.parse(storedUser).name
        );
      } else {
        console.log("Nenhum usuário encontrado no storage");
      }
    } catch (error) {
      console.error("Erro ao carregar dados do storage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Timeout de 60 segundos (para servidor dormindo no Render)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as ErrorResponse;
        throw new Error(errorData.message || "Erro ao fazer login");
      }

      const authData = data as AuthResponse;

      // Extrai o token (pode vir como string ou dentro de um objeto)
      const tokenString =
        typeof authData.access_token === "string"
          ? authData.access_token
          : authData.access_token?.access_token ||
            JSON.stringify(authData.access_token);

      // Salva no estado
      setToken(tokenString);
      setUser(authData.user);

      // Persiste no AsyncStorage
      await AsyncStorage.setItem("@App:token", tokenString);
      await AsyncStorage.setItem("@App:user", JSON.stringify(authData.user));

      // Persiste no localStorage também (web)
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("@App:token", tokenString);
        window.localStorage.setItem("@App:user", JSON.stringify(authData.user));
      }

      console.log("Login realizado com sucesso:", authData.user.name);
    } catch (error: any) {
      if (error.name === "AbortError") {
        throw new Error(
          "Tempo esgotado. O servidor pode estar iniciando, aguarde 1 minuto e tente novamente."
        );
      }
      console.error("Erro no signIn:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setToken(null);
      setUser(null);

      // Remove do AsyncStorage (mobile e web)
      await AsyncStorage.removeItem("@App:token");
      await AsyncStorage.removeItem("@App:user");

      // Remove do localStorage também (web)
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.removeItem("@App:token");
        window.localStorage.removeItem("@App:user");
      }

      console.log("Logout realizado com sucesso");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
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
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

function AuthGate() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    // Rotas que NÃO precisam de autenticação
    const publicRoutes = ["/", "/login", "/register", "/pesquisarReceitas"];
    const current = pathname ?? "/";

    // Se NÃO está logado e NÃO está em rota pública → redireciona para login
    if (!user && !publicRoutes.includes(current)) {
      console.log("Usuário não logado, redirecionando para /login");
      router.replace("/login");
    }
    // Se ESTÁ logado e está na rota raiz → redireciona para tabs
    else if (user && current === "/") {
      console.log("Usuário logado na raiz, redirecionando para /(tabs)");
      router.replace("/(tabs)");
    }
    // Se ESTÁ logado e está em /login ou /register → redireciona para tabs
    else if (user && (current === "/login" || current === "/register")) {
      console.log(
        "Usuário logado em rota pública, redirecionando para /(tabs)"
      );
      router.replace("/(tabs)");
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#22577A" />
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
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
