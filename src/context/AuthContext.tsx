import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "@UserAuthenticator:users";
const AUTH_USER_KEY = "@UserAuthenticator:authUser";

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const storedUserId = await AsyncStorage.getItem(AUTH_USER_KEY);
        if (storedUserId) {
          const usersData = await AsyncStorage.getItem(USERS_KEY);
          const users = usersData ? JSON.parse(usersData) : [];
          const foundUserObj = users.find((u: any) => u.id === storedUserId);
          if (foundUserObj) {
            setUser({ id: foundUserObj.id, name: foundUserObj.name, email: foundUserObj.email });
          }
        }
      } catch (e) {
        console.warn("AuthProvider init error", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const saveUsers = async (users: any[]) => {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { ok: false, error: "Invalid email format." };
    if (!password || password.length < 1) return { ok: false, error: "Password required." };

    try {
      const usersData = await AsyncStorage.getItem(USERS_KEY);
      const users = usersData ? JSON.parse(usersData) : [];
      const foundUserObj = users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (!foundUserObj) {
        return { ok: false, error: "User not foundUserObj. Please sign up." };
      }
      if (foundUserObj.password !== password) {
        return { ok: false, error: "Incorrect credentials." };
      }

      const loggedUser = { id: foundUserObj.id, name: foundUserObj.name, email: foundUserObj.email };
      setUser(loggedUser);
      await AsyncStorage.setItem(AUTH_USER_KEY, foundUserObj.id);
      return { ok: true };
    } catch (err) {
      console.error(err);
      return { ok: false, error: "Login failed." };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    if (!name.trim()) return { ok: false, error: "Name is required." };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { ok: false, error: "Invalid email format." };
    if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };

    try {
      const usersData = await AsyncStorage.getItem(USERS_KEY);
      const users = usersData ? JSON.parse(usersData) : [];
      const isUserExists = users.some((u: any) => u.email.toLowerCase() === email.toLowerCase());
      if (isUserExists) return { ok: false, error: "An account with this email already exists." };

      const newUser = { id: generateId(), name, email, password };
      users.push(newUser);
      await saveUsers(users);

      const loggedUser = { id: newUser.id, name: newUser.name, email: newUser.email };
      setUser(loggedUser);
      await AsyncStorage.setItem(AUTH_USER_KEY, newUser.id);
      return { ok: true };
    } catch (err) {
      console.error(err);
      return { ok: false, error: "Signup failed." };
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(AUTH_USER_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("useAuth must be used within AuthProvider");
  return authContext;
};
