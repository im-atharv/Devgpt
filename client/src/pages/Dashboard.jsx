// pages/Dashboard.jsx
import React, { useState, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Components
import PRInputForm from "../components/PRInputForm";
import ReviewResultCard from "../components/ReviewResultCard";
import PDFExportButton from "../components/PDFExportButton";
import Loader from "../components/Loader";
import ErrorMessageBox from "../components/ErrorMessageBox";
import Card from "../components/Card.jsx";

// Context
import { HistoryContext } from "../context/HistoryContext";

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

        // Push result to context
        addReviewToHistory(result);
    };

    const handleStartLoading = () => {
        setLoading(true);
        setError("");
        setReviewResult(null);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <motion.h1
                    className="text-center text-3xl md:text-4xl font-bold mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    🚀 DevGPT — PR Reviewer
                </motion.h1>

                <Card>
                    <PRInputForm
                        onReviewSuccess={handleReviewSuccess}
                        onStartLoading={handleStartLoading}
                    />
                </Card>

                {/* Output or Loading */}
                <div className="mt-10">
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
                                transition={{ duration: 0.4 }}
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
