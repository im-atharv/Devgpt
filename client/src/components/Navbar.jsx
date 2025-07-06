import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Clock, LogOut, LogIn } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { initiateGitHubLogin } from "../services/authService";

export default function Navbar() {
    const { isLoggedIn, logout, user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [greeting, setGreeting] = useState("");

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        const hours = new Date().getHours();
        let greet = "Hello";

        if (hours > 4 && hours < 12) greet = "Good Morning";
        else if (hours >= 12 && hours < 17) greet = "Good Afternoon";
        else greet = "Good Evening";

        const name = user?.name?.split(" ")[0] || "there";
        setGreeting(`${greet}, ${name}`);
    }, [user]);

    return (
        <header className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo and Greeting */}
                <div className="flex flex-col gap-1 z-10">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-blue-600 dark:text-blue-400"
                    >
                        DevGPT
                    </Link>
                    {isLoggedIn && (
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            {greeting}
                        </span>
                    )}
                </div>

                {/* Center Title */}
                <span className="hidden md:block absolute left-1/2 transform -translate-x-1/2 font-semibold text-base text-gray-700 dark:text-gray-300 tracking-wide">
                    AI-PR-Reviewer
                </span>

                {/* Desktop Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            <Link
                                to="/history"
                                className="text-sm px-4 py-2 rounded-md bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300 dark:from-gray-800 dark:to-gray-700 dark:text-white dark:hover:from-gray-700 dark:hover:to-gray-600 transition font-medium"
                            >
                                History
                            </Link>
                            <motion.button
                                onClick={handleLogout}
                                whileTap={{ scale: 0.96 }}
                                className="cursor-pointer text-sm px-4 py-2 rounded-md bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90 transition font-medium"
                            >
                                Logout
                            </motion.button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="text-sm px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition font-medium"
                            >
                                Login
                            </Link>
                            <motion.button
                                onClick={initiateGitHubLogin}
                                whileTap={{ scale: 0.96 }}
                                className="text-sm px-4 py-2 rounded-md bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:opacity-90 dark:from-gray-700 dark:to-gray-600 transition font-medium"
                            >
                                GitHub Login
                            </motion.button>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden z-10">
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="text-gray-800 dark:text-gray-200 transition"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <LayoutGroup>
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            key="dropdown"
                            layout
                            initial={{ opacity: 0, maxHeight: 0 }}
                            animate={{ opacity: 1, maxHeight: 500 }}
                            exit={{ opacity: 0, maxHeight: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 px-4 pt-4 pb-6 space-y-3"
                        >
                            {isLoggedIn && (
                                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 px-1">
                                    {greeting}
                                </div>
                            )}
                            {isLoggedIn ? (
                                <>
                                    <Link
                                        to="/history"
                                        onClick={() => setMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 hover:from-gray-200 hover:to-gray-300 dark:from-gray-800 dark:to-gray-700 dark:text-white dark:hover:from-gray-700 dark:hover:to-gray-600 transition font-medium"
                                    >
                                        <Clock size={16} />
                                        History
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMenuOpen(false);
                                        }}
                                        className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-gradient-to-r from-red-500 to-pink-500 text-white hover:opacity-90 transition w-full text-left font-medium"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition font-medium"
                                    >
                                        <LogIn size={16} />
                                        Login
                                    </Link>
                                    <button
                                        onClick={() => {
                                            initiateGitHubLogin();
                                            setMenuOpen(false);
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:opacity-90 dark:from-gray-700 dark:to-gray-600 transition w-full font-medium"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 0C5.37 0 0 5.4 0 12.07c0 5.34 3.44 9.86 8.21 11.46.6.12.82-.26.82-.58v-2.24c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.35-1.78-1.35-1.78-1.1-.77.09-.76.09-.76 1.22.09 1.86 1.27 1.86 1.27 1.08 1.87 2.84 1.33 3.53 1.02.11-.8.42-1.33.76-1.63-2.66-.31-5.47-1.36-5.47-6.05 0-1.33.47-2.42 1.25-3.27-.13-.32-.54-1.58.12-3.3 0 0 1.01-.33 3.3 1.25a11.3 11.3 0 0 1 6 0c2.3-1.58 3.3-1.25 3.3-1.25.66 1.72.25 2.98.12 3.3.78.85 1.25 1.94 1.25 3.27 0 4.71-2.81 5.73-5.48 6.04.44.38.83 1.11.83 2.25v3.34c0 .32.21.7.82.58A12.06 12.06 0 0 0 24 12.07C24 5.4 18.63 0 12 0z" />
                                        </svg>
                                        GitHub Login
                                    </button>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </LayoutGroup>
        </header>
    );
}
