// context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/authService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isGitHubLogin, setIsGitHubLogin] = useState(false);
  const isLoggedIn = !!user;

  // Sync from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("devgpt-user");
    const githubLogin = localStorage.getItem("isGitHubLogin") === "true";

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsGitHubLogin(githubLogin);
  }, []);

  // Cross-tab sync (optional but useful)
  useEffect(() => {
    const syncAuth = () => {
      const storedUser = localStorage.getItem("devgpt-user");
      const githubLogin = localStorage.getItem("isGitHubLogin") === "true";

      setUser(storedUser ? JSON.parse(storedUser) : null);
      setIsGitHubLogin(githubLogin);
    };

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const login = async (formData) => {
    setLoading(true);
    try {
      const data = await loginUser(formData);
      const user = data.message.user;
      const token = data.message.token;

      setUser(user);
      setIsGitHubLogin(false);

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
      setIsGitHubLogin(false);

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
    setIsGitHubLogin(true);

    localStorage.setItem("devgpt-user", JSON.stringify(userFromGitHub));
    localStorage.setItem("devgpt-token", token);
    localStorage.setItem("isGitHubLogin", "true");
  };

  const logout = () => {
    setUser(null);
    setIsGitHubLogin(false);

    localStorage.removeItem("devgpt-user");
    localStorage.removeItem("devgpt-token");
    localStorage.removeItem("isGitHubLogin");
  };

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
