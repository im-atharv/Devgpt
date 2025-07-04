import React from "react";
import { FaGithub } from "react-icons/fa";

const GITHUB_AUTH_URL = "http://localhost:5000/api/auth/github"; // will redirect to GitHub OAuth

export default function GitHubLoginButton({ label = "Continue with GitHub" }) {
    return (
        <a
            href={GITHUB_AUTH_URL}
            className="flex items-center justify-center gap-2 px-4 py-3 w-full border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm font-medium"
        >
            <FaGithub className="text-lg" />
            {label}
        </a>
    );
}
