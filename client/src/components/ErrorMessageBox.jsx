import React from "react";
import { AlertTriangle } from "lucide-react";

export default function ErrorMessageBox({ message }) {
    if (!message) return null;

    return (
        <div className="flex items-center gap-3 bg-red-100/90 dark:bg-red-900/80 text-red-800 dark:text-red-200 px-5 py-4 rounded-lg border border-red-300 dark:border-red-700 shadow-sm transition">
            <AlertTriangle size={20} className="flex-shrink-0" />
            <span className="text-sm font-medium">{message}</span>
        </div>
    );
}
