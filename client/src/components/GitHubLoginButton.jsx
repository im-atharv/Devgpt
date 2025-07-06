import React from "react";
import { FaGithub } from "react-icons/fa";
import { GITHUB_AUTH_URL } from "../constants.js"; 

export default function GitHubLoginButton({ label = "Continue with GitHub" }) {
    return (
        <a
            href={GITHUB_AUTH_URL}
            className="group relative inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none"
        >
            <span className="absolute -inset-1 rounded-lg bg-black opacity-0 group-hover:opacity-5 group-hover:blur-sm transition-all duration-300"></span>
            <FaGithub className="text-xl z-10" />
            <span className="z-10 text-sm font-semibold">{label}</span>
        </a>
    );
}
