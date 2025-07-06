import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import SectionTitle from "../components/SectionTitle";
import ReviewModal from "../components/ReviewModal";

import { HistoryContext } from "../context/HistoryContext";

export default function History() {
    const { history, loading } = useContext(HistoryContext);
    const [selectedReview, setSelectedReview] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-10">
            <div className="max-w-4xl mx-auto space-y-6">
                <SectionTitle text="Review History" />
                {history.length > 0 && (
                    <motion.button
                        onClick={() => navigate("/dashboard")}
                        whileTap={{ scale: 0.96 }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="cursor-pointer flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
                    >
                        <ArrowLeft size={16} />
                        Back to PR Review
                    </motion.button>
                )}

                {loading ? (
                    <Loader message="Fetching previous reviews..." />
                ) : history.length === 0 ? (
                    <div className="flex flex-col items-center gap-6">
                        <EmptyState message="No past reviews yet. Start by submitting a PR!" />
                        <motion.button
                            onClick={() => navigate("/dashboard")}
                            whileTap={{ scale: 0.97 }}
                            className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg shadow transition"
                        >
                            Review Now 🚀
                        </motion.button>
                    </div>
                )
                    : (
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

                                    {/* Bottom action row */}
                                    <div className="flex justify-end mt-6">
                                        <motion.button
                                            onClick={() => setSelectedReview(item)}
                                            whileTap={{ scale: 0.97 }}
                                            className="cursor-pointer inline-flex items-center text-sm font-medium px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 shadow-sm transition"
                                        >
                                            View Full Review
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
            </div>
            <ReviewModal
                isOpen={!!selectedReview}
                onClose={() => setSelectedReview(null)}
                review={selectedReview}
            />
        </div>
    );
}
