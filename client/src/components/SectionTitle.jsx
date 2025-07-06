import React from "react";

export default function SectionTitle({ text }) {
    return (
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
            {text}
        </h2>
    );
}
