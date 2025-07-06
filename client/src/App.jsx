import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useAuth from "./hooks/useAuth";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import GitHubAuthSuccess from "./pages/GitHubAuthSuccess";

// Components
import Navbar from "./components/Navbar";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <ToastContainer position="top-center" autoClose={3000} />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <RedirectIfAuthenticated>
                  <LandingPage />
                </RedirectIfAuthenticated>
              }
            />
            <Route
              path="/login"
              element={
                <RedirectIfAuthenticated>
                  <Login />
                </RedirectIfAuthenticated>
              }
            />
            <Route
              path="/register"
              element={
                <RedirectIfAuthenticated>
                  <Register />
                </RedirectIfAuthenticated>
              }
            />
            <Route path="/github-success" element={<GitHubAuthSuccess />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <History />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
