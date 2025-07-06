// src/components/RedirectIfAuthenticated.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RedirectIfAuthenticated({ children }) {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Navigate to="/dashboard" replace /> : children;
}
