// context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("devgpt-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [isGitHubLogin, setIsGitHubLogin] = useState(
    localStorage.getItem("isGitHubLogin") === "true"
  );
  const isLoggedIn = !!user;

  const login = async (formData) => {
    setLoading(true);
    try {
      const data = await loginUser(formData);
      const user = data.message.user;
      const token = data.message.token;

      setUser(user);
      localStorage.setItem("devgpt-user", JSON.stringify(user));
      localStorage.setItem("devgpt-token", token);
      localStorage.setItem("isGitHubLogin", "false");

      return { success: true };
    } catch (err) {
      console.error("Login error:", err);
      return {
        success: false,
        message: err?.response?.data?.message || err.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      const data = await registerUser(formData);
      const user = data.message.user;
      const token = data.message.token;

      setUser(user);
      localStorage.setItem("devgpt-user", JSON.stringify(user));
      localStorage.setItem("devgpt-token", token);
      localStorage.setItem("isGitHubLogin", "false");

      return { success: true };
    } catch (err) {
      console.error("Register error:", err);
      return {
        success: false,
        message:
          err?.response?.data?.message || err.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const loginWithGitHub = (token, userFromGitHub) => {
    setUser(userFromGitHub);
    localStorage.setItem("devgpt-user", JSON.stringify(userFromGitHub));
    localStorage.setItem("devgpt-token", token);
    localStorage.setItem("isGitHubLogin", "true");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("devgpt-user");
    localStorage.removeItem("devgpt-token");
    localStorage.removeItem("isGitHubLogin");
  };

  useEffect(() => {
    const syncAuth = () => {
      const storedUser = localStorage.getItem("devgpt-user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        isGitHubLogin,
        login,
        register,
        logout,
        loginWithGitHub,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
