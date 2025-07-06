import React from "react";

export default function Loader({ message = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center text-blue-600 dark:text-blue-400 animate-pulse py-6 space-y-2">
            <div className="w-5 h-5 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium">{message}</p>
        </div>
    );
}
