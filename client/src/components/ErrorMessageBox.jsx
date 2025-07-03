import React from "react";
import { AlertTriangle } from "lucide-react";

export default function ErrorMessageBox({ message }) {
    if (!message) return null;

    return (
        <div className="flex items-center gap-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-4 py-3 rounded-md">
            <AlertTriangle size={18} />
            <span>{message}</span>
        </div>
    );
}
