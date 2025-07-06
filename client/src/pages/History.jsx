// pages/History.jsx
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import SectionTitle from "../components/SectionTitle";
import ReviewModal from "../components/ReviewModal"; // ✅ import

import { HistoryContext } from "../context/HistoryContext";

export default function History() {
    const { history, loading } = useContext(HistoryContext);
    const [selectedReview, setSelectedReview] = useState(null);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-10">
            <div className="max-w-4xl mx-auto">
                <SectionTitle text="Review History" />

                {loading ? (
                    <Loader message="Fetching previous reviews..." />
                ) : history.length === 0 ? (
                    <EmptyState message="No past reviews yet. Start by submitting a PR!" />
                ) : (
                    <div className="space-y-6">
                        {history.map((item, index) => (
                            <motion.div
                                key={item._id || index}
                                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-xl shadow relative"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <div className="flex justify-between items-center">
                                    <a
                                        href={item.prUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 dark:text-blue-400 underline text-sm font-mono break-all"
                                    >
                                        {item.prUrl}
                                    </a>
                                    <span
                                        className={`text-xs font-semibold uppercase px-2 py-1 rounded-full ${item.riskLevel === "high"
                                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                            : item.riskLevel === "medium"
                                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                            }`}
                                    >
                                        {item.riskLevel}
                                    </span>
                                </div>

                                <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line line-clamp-3">
                                    {item.summary || "No summary provided by AI."}
                                </p>

                                <button
                                    onClick={() => setSelectedReview(item)}
                                    className="mt-4 inline-block text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition px-4 py-2 rounded-md"
                                >
                                    View Full Review
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* ✅ Modal when item is selected */}
            <ReviewModal
                isOpen={!!selectedReview}
                onClose={() => setSelectedReview(null)}
                review={selectedReview}
            />
        </div>
    );
}
