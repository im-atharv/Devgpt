import { Rocket, ShieldCheck, Lightbulb } from "lucide-react";


export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export const GITHUB_AUTH_URL = `${API_BASE_URL}/api/auth/github`;

export const INSIGHT_FEATURES = [
    {
        icon: Rocket,
        iconColor: "text-purple-600 dark:text-purple-400",
        title: "Instant PR Feedback",
        description: "Get automated summaries, suggestions, and risk levels powered by AI — in seconds.",
    },
    {
        icon: ShieldCheck,
        iconColor: "text-blue-600 dark:text-blue-400",
        title: "Security-First",
        description: "OAuth login ensures your private repos and data stay secure.",
    },
    {
        icon: Lightbulb,
        iconColor: "text-yellow-600 dark:text-yellow-400",
        title: "Smart Suggestions",
        description: "AI points out code smells, design flaws, and gives actionable advice.",
    },
];

// Labels
export const SITE_TITLE = "DevGPT";
export const NAV_TAGLINE = "AI-PR-Reviewer";

// Greetings
export const getGreeting = (user) => {
    const hours = new Date().getHours();
    let greet = "Hello";

    if (hours > 4 && hours < 12) greet = "Good Morning";
    else if (hours >= 12 && hours < 17) greet = "Good Afternoon";
    else greet = "Good Evening";

    const name = user?.name?.split(" ")[0] || "there";
    return `${greet}, ${name}`;
};

// Rotating Developer Quotes
export const ROTATING_QUOTES = [
    "“Good code is its own best documentation.” — Steve McConnell",
    "“First, solve the problem. Then, write the code.” — John Johnson",
    "“Code is like humor. When you have to explain it, it’s bad.” — Cory House",
];

// Risk Levels used in PR Review
export const VALID_RISK_LEVELS = ["low", "medium", "high"];

// Risk level badge styles used in ReviewResultCard
export const RISK_STYLES = {
    low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    unknown: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
};