import React from "react";
import { motion } from "framer-motion";

export default function ReviewResultCard({ data }) {
    // Auto-detect structure: use data.message if it exists
    const {
        summary,
        riskLevel,
        suggestions,
        affectedFiles,
    } = data?.message || data || {};

    const riskColors = {
        low: "bg-green-100 text-green-800",
        medium: "bg-yellow-100 text-yellow-800",
        high: "bg-red-100 text-red-800",
    };

    return (
        <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 space-y-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    PR Review Summary
                </h3>
                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${riskColors[riskLevel] || "bg-gray-200 text-gray-800"
                        }`}
                >
                    Risk: {riskLevel || "unknown"}
                </span>
            </div>

            <div>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                    {summary || "No summary provided by AI."}
                </p>
            </div>

            {suggestions?.length > 0 && (
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        Suggestions
                    </h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                        {suggestions.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {affectedFiles?.length > 0 && (
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                        Affected Files
                    </h4>
                    <ul className="pl-4 space-y-1 text-blue-600 dark:text-blue-400 text-sm font-mono">
                        {affectedFiles.map((file, idx) => (
                            <li key={idx}>📁 {file}</li>
                        ))}
                    </ul>
                </div>
            )}
        </motion.div>
    );
}
