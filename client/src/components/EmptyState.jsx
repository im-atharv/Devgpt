import React from "react";
import { Inbox } from "lucide-react";

export default function EmptyState({ message = "No data to display." }) {
    return (
        <div className="flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 py-10 space-y-3">
            <Inbox size={36} className="text-gray-400 dark:text-gray-600" />
            <p className="text-lg font-medium">{message}</p>
        </div>
    );
}
