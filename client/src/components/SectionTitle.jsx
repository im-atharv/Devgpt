import React from "react";

export default function SectionTitle({ text }) {
    return (
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
            {text}
        </h2>
    );
}
