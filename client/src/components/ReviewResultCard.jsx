import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, Lightbulb, FolderGit2, FileWarning } from "lucide-react";
import { RISK_STYLES } from "../constants"; // ✅ Imported styles

export default function ReviewResultCard({ data }) {
    const {
        summary,
        riskLevel,
        suggestions,
        affectedFiles,
        fileComments = [],
    } = data?.message || data || {};

    const filteredFileComments = fileComments.filter((fc) => fc.issues?.length > 0);

    return (
        <motion.div
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 space-y-8 border border-gray-200 dark:border-gray-700 transition-all"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    Review Summary
                </h2>
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${RISK_STYLES[riskLevel] || RISK_STYLES.unknown}`}>
                    Risk: {riskLevel || "unknown"}
                </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-base whitespace-pre-line leading-relaxed">
                {summary || "No summary provided by AI."}
            </p>

            {suggestions?.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Lightbulb className="w-5 h-5 text-purple-500 dark:text-purple-300" />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Suggestions</h3>
                    </div>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                        {suggestions.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                </div>
            )}

            {affectedFiles?.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <FolderGit2 className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Affected Files</h3>
                    </div>
                    <ul className="pl-2 space-y-1 text-blue-600 dark:text-blue-400 text-sm font-mono">
                        {affectedFiles.map((file, idx) => <li key={idx}>📁 {file}</li>)}
                    </ul>
                </div>
            )}

            {filteredFileComments.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-2 mt-4">
                        <FileWarning className="w-5 h-5 text-red-500 dark:text-red-400" />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">File Comments</h3>
                    </div>
                    <div className="space-y-4">
                        {filteredFileComments.map((file, idx) => (
                            <div
                                key={idx}
                                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800"
                            >
                                <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2 font-mono">
                                    📄 {file.filename}
                                </p>
                                <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                    {file.issues.map((issue, i) => (
                                        <li key={i}>{issue}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
