// components/ReviewModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ReviewModal({ isOpen, onClose, review }) {
    if (!isOpen || !review) return null;

    const {
        prUrl,
        summary,
        riskLevel,
        suggestions = [],
        affectedFiles = [],
        fileComments = [],
    } = review;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 relative overflow-y-auto max-h-[90vh]"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
                    >
                        <X size={20} />
                    </button>

                    <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                        Full AI Review
                    </h2>

                    <a
                        href={prUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-sm font-mono text-blue-500 underline break-words mb-4"
                    >
                        {prUrl}
                    </a>

                    <div className="mb-4">
                        <span
                            className={`inline-block text-xs font-semibold uppercase px-2 py-1 rounded-full ${riskLevel === "high"
                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                    : riskLevel === "medium"
                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                }`}
                        >
                            Risk: {riskLevel}
                        </span>
                    </div>

                    <section className="mb-6">
                        <h3 className="font-semibold mb-1">Summary</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            {summary || "No summary provided."}
                        </p>
                    </section>

                    {suggestions.length > 0 && (
                        <section className="mb-6">
                            <h3 className="font-semibold mb-1">Suggestions</h3>
                            <ul className="text-sm list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                                {suggestions.map((s, i) => (
                                    <li key={i}>{s}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {affectedFiles.length > 0 && (
                        <section className="mb-6">
                            <h3 className="font-semibold mb-1">Affected Files</h3>
                            <ul className="text-sm list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                                {affectedFiles.map((f, i) => (
                                    <li key={i}>{f}</li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {fileComments.length > 0 && (
                        <section className="mb-6">
                            <h3 className="font-semibold mb-1">File Comments</h3>
                            {fileComments.map((fc, i) => (
                                <div key={i} className="mb-3">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{fc.filename}</p>
                                    <ul className="text-sm list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1 mt-1">
                                        {fc.issues.map((issue, j) => (
                                            <li key={j}>{issue}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>
                    )}

                    <div className="text-right mt-8">
                        <button
                            onClick={onClose}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition"
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
