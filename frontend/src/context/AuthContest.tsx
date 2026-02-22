import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  role?: string;
  exp: number;
}

interface AuthContextType {
  token: string | null;
  email: string | null;
  role: string;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("access_token"));
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string>("viewer");

  const decodeToken = useCallback((t: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(t);
      setEmail(decoded.sub || null);
      setRole(decoded.role || "viewer");
    } catch {
      setEmail(null);
      setRole("viewer");
    }
  }, []);

  useEffect(() => {
    if (token) {
      decodeToken(token);
    }
  }, [token, decodeToken]);

  const login = (newToken: string) => {
    localStorage.setItem("access_token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setEmail(null);
    setRole("viewer");
  };

  return (
    <AuthContext.Provider value={{ token, email, role, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
