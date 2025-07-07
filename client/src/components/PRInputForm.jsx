import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { prSchema } from "../validation/prSchema";
import { submitPRReview } from "../services/reviewService";
import { saveReview } from "../services/historyService";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { ROTATING_QUOTES, VALID_RISK_LEVELS } from "../constants.js";

export default function PRInputForm({ onReviewSuccess }) {
    const { isGitHubLogin } = useAuth();
    const [useGitHubToken, setUseGitHubToken] = useState(() => isGitHubLogin);
    const [quoteIndex, setQuoteIndex] = useState(0);

    useEffect(() => {
        if (isGitHubLogin) {
            setUseGitHubToken(true);
        }
    }, [isGitHubLogin]);

    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIndex((prev) => (prev + 1) % ROTATING_QUOTES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (values, actions) => {
        try {
            if (useGitHubToken && !isGitHubLogin) {
                toast.error("⚠️ Please log in with GitHub to review private PRs.");
                actions.setSubmitting(false);
                return;
            }

            const apiResponse = await submitPRReview(values.prUrl, useGitHubToken);
            const review = apiResponse?.message;

            if (!review || !review.summary || !review.riskLevel) {
                throw new Error("AI review did not return valid content");
            }

            const riskLevel = VALID_RISK_LEVELS.includes(review.riskLevel)
                ? review.riskLevel
                : "low";

            await saveReview({
                prUrl: values.prUrl,
                summary: review.summary,
                riskLevel,
                suggestions: review.suggestions,
                affectedFiles: review.affectedFiles,
                fileComments: review.fileComments,
            });

            onReviewSuccess({ prUrl: values.prUrl, ...review });
            actions.resetForm();
        } catch (error) {
            const response = error?.response;
            const backendMsg = response?.data?.message || error.message;

            if (
                (response?.status === 401 || response?.status === 403) &&
                backendMsg.toLowerCase().includes("github")
            ) {
                actions.setFieldError("prUrl", "🔒 You must log in with Your GitHub to review private PRs Of Your Private PR.");
            } else {
                actions.setFieldError("prUrl", backendMsg || "Review failed.");
            }

            console.error("Review failed:", error);
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <motion.div
            className="relative w-full max-w-xl h-full flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-3xl p-8 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Blurred Glowing Backgrounds */}
            <div className="absolute -top-10 -left-10 w-60 h-60 bg-blue-400/20 dark:bg-blue-600/20 blur-[100px] rounded-full pointer-events-none z-0" />
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-purple-400/20 dark:bg-purple-600/20 blur-[100px] rounded-full pointer-events-none z-0" />

            <div className="relative z-10 flex flex-col h-full space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Submit a PR for AI Review
                </h2>

                <Formik
                    initialValues={{ prUrl: "" }}
                    validationSchema={toFormikValidationSchema(prSchema)}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-5 flex flex-col h-full">
                            {/* PR Input */}
                            <div>
                                <Field
                                    name="prUrl"
                                    type="text"
                                    placeholder="https://github.com/user/repo/pull/123"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder:text-sm"
                                />
                                <ErrorMessage
                                    name="prUrl"
                                    component="div"
                                    className="text-sm text-red-500 mt-1"
                                />
                            </div>

                            {/* GitHub OAuth Toggle */}
                            {isGitHubLogin && (
                                <label className="inline-flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={useGitHubToken}
                                        onChange={() => setUseGitHubToken(!useGitHubToken)}
                                        className="accent-blue-600 w-4 h-4"
                                    />
                                    Use GitHub token for private PRs
                                </label>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileTap={{ scale: 0.98 }}
                                className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Reviewing..." : "Review PR 🔍"}
                            </motion.button>

                            {/* Quote */}
                            <div className="pt-0 mb-0 text-sm text-gray-600 dark:text-gray-300 text-center italic leading-snug min-h-[48px] transition-opacity duration-300">
                                {ROTATING_QUOTES[quoteIndex]}
                            </div>

                            {/* Trust Indicator */}
                            <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                                🚀 <span className="font-medium">10,542+</span> pull requests reviewed by DevGPT.
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </motion.div>
    );
}
