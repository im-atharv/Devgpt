import React from "react";

export default function EmptyState({ message = "No data to display." }) {
    return (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            <p className="text-lg">{message}</p>
        </div>
    );
}
