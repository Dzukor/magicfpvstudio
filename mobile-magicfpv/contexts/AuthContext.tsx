import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppState, AppStateStatus } from "react-native";

const INACTIVITY_TIMEOUT = 10 * 60 * 1000;

interface AuthContextType {
  isLoggedIn: boolean | null;
  logout: () => Promise<void>;
  login: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    checkAuth();
    const cleanup = setupAppStateListener();

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn === true) {
      resetInactivityTimer();
    }
  }, [isLoggedIn]);

  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const loginTime = await AsyncStorage.getItem("loginTime");

      if (token && loginTime) {
        const timePassed = Date.now() - parseInt(loginTime);
        if (timePassed > INACTIVITY_TIMEOUT) {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("loginTime");
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setIsLoggedIn(false);
    }
  };

  const setupAppStateListener = () => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );
    return () => subscription.remove();
  };

  const handleAppStateChange = async (state: AppStateStatus) => {
    if (state === "background" || state === "inactive") {
      await logout();
    } else if (state === "active") {
      await checkAuth();
    }
  };

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = setTimeout(() => {
      logout();
    }, INACTIVITY_TIMEOUT);
  };

  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("loginTime", Date.now().toString());
      setIsLoggedIn(true);
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("loginTime");
      setIsLoggedIn(false);
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
