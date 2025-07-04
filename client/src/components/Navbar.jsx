import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { initiateGitHubLogin } from "../services/authService";

export default function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow">
            <div className="relative max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Left: Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-blue-600 dark:text-blue-400 z-10 hover:opacity-90 transition"
                >
                    DevGPT
                </Link>

                {/* Center: Title */}
                <span className="absolute left-1/2 transform -translate-x-1/2 font-semibold text-base text-gray-700 dark:text-gray-200 tracking-wide">
                    AI-PR-Reviewer
                </span>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 z-10">
                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/history"
                                className="text-sm px-3 py-1 rounded-md font-medium transition-colors duration-200
                                           bg-gray-100 text-gray-800 hover:bg-gray-200
                                           dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                            >
                                History
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-sm px-3 py-1 rounded-md font-medium transition-colors duration-200
                                           bg-gray-100 text-gray-800 hover:bg-gray-200
                                           dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-sm px-3 py-1 rounded-md font-medium transition-colors duration-200
                                           bg-blue-100 text-blue-800 hover:bg-blue-200
                                           dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
                            >
                                Login
                            </Link>
                            <button
                                onClick={initiateGitHubLogin}
                                className="text-sm px-3 py-1 rounded-md font-medium transition-colors duration-200
                                           bg-black text-white hover:bg-gray-800
                                           dark:bg-gray-700 dark:hover:bg-gray-600"
                            >
                                GitHub Login
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
