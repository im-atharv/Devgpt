import React, { useState, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import PRInputForm from "../components/PRInputForm";
import ReviewResultCard from "../components/ReviewResultCard";
import PDFExportButton from "../components/PDFExportButton";
import Loader from "../components/Loader";
import ErrorMessageBox from "../components/ErrorMessageBox";

// Context
import { HistoryContext } from "../context/HistoryContext";
import InsightsCard from "../components/InsightsCard";

export default function Dashboard() {
    const [reviewResult, setReviewResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const resultRef = useRef();

    const { addReviewToHistory } = useContext(HistoryContext);

    const handleReviewSuccess = async (result) => {
        setLoading(false);
        setError("");
        setReviewResult(result);
        addReviewToHistory(result);
    };

    const handleStartLoading = () => {
        setLoading(true);
        setError("");
        setReviewResult(null);
    };

    return (
        <div className="relative min-h-screen px-4 py-16 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300 overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-400/20 dark:bg-purple-600/20 blur-[140px] rounded-full z-0" />
            <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-blue-300/20 dark:bg-blue-600/20 blur-2xl rounded-full z-0" />

            <div className="relative z-10 max-w-5xl mx-auto space-y-12">
                {/* Title */}
                <motion.h1
                    className="text-center text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Welcome to{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        DevGPT
                    </span>
                </motion.h1>
                <p className="text-center text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                    Paste your PR link and let AI handle the reviews — get instant feedback, bug detection, and more.
                </p>

                {/* Glassmorphic PR Form */}
                <motion.div
                    className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl shadow-2xl ring-1 ring-black/10 dark:ring-white/10 p-6 md:p-8"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex flex-col md:flex-row gap-8 items-stretch">
                        <div className="md:w-1/2">
                            <PRInputForm
                                onReviewSuccess={handleReviewSuccess}
                                onStartLoading={handleStartLoading}
                            />
                        </div>
                        <InsightsCard />
                    </div>
                </motion.div>

                {/* Results */}
                <div className="relative z-10">
                    <AnimatePresence mode="wait">
                        {loading && (
                            <motion.div
                                key="loading"
                                className="flex justify-center py-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <Loader message="Reviewing your PR..." />
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="py-4"
                            >
                                <ErrorMessageBox message={error} />
                            </motion.div>
                        )}

                        {reviewResult && (
                            <motion.div
                                key="result"
                                ref={resultRef}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-6"
                            >
                                <ReviewResultCard data={reviewResult} />
                                <PDFExportButton contentRef={resultRef} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
