import React from "react";

export default function Loader({ message = "Loading..." }) {
    return (
        <div className="text-center py-4 text-blue-600 animate-pulse font-medium">
            🔄 {message}
        </div>
    );
}
