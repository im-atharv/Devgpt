import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, Lightbulb, FolderGit2 } from "lucide-react";

export default function ReviewResultCard({ data }) {
    const {
        summary,
        riskLevel,
        suggestions,
        affectedFiles,
    } = data?.message || data || {};

    const riskStyles = {
        low: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        unknown: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
    };

    return (
        <motion.div
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 space-y-8 border border-gray-200 dark:border-gray-700 transition-all"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    Review Summary
                </h2>
                <span
                    className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${riskStyles[riskLevel] || riskStyles.unknown}`}
                >
                    Risk: {riskLevel || "unknown"}
                </span>
            </div>

            {/* Summary */}
            <div>
                <p className="text-gray-700 dark:text-gray-300 text-base whitespace-pre-line leading-relaxed">
                    {summary || "No summary provided by AI."}
                </p>
            </div>

            {/* Suggestions */}
            {suggestions?.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-5 h-5 text-purple-500 dark:text-purple-300" />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Suggestions
                        </h3>
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        {suggestions.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Affected Files */}
            {affectedFiles?.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <FolderGit2 className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                            Affected Files
                        </h3>
                    </div>
                    <ul className="pl-2 space-y-1 text-blue-600 dark:text-blue-400 text-sm font-mono">
                        {affectedFiles.map((file, idx) => (
                            <li key={idx}>📁 {file}</li>
                        ))}
                    </ul>
                </div>
            )}
        </motion.div>
    );
}
