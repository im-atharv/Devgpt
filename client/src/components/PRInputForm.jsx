import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { prSchema } from "../validation/prSchema";
import { submitPRReview } from "../services/reviewService";
import { saveReview } from "../services/historyService";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function PRInputForm({ onReviewSuccess }) {
    const { isGitHubLogin } = useAuth();
    const [useGitHubToken, setUseGitHubToken] = useState(false);
    const initialValues = { prUrl: "" };
    useEffect(() => {
        setUseGitHubToken(isGitHubLogin);
    }, [isGitHubLogin]);

    const handleSubmit = async (values, actions) => {
        try {
            // 🔒 Prevent users from reviewing private PRs if not logged in with GitHub
            if (useGitHubToken && !isGitHubLogin) {
                toast.error("⚠️ Please log in with GitHub to review private PRs.");
                actions.setSubmitting(false);
                return;
            }

            // ✅ Call backend to generate AI review
            const apiResponse = await submitPRReview(values.prUrl, useGitHubToken);
            console.log("✅ AI response:", apiResponse);

            const review = apiResponse?.message;

            // 🚫 Ensure all required fields are present
            if (!review || !review.summary || !review.riskLevel) {
                throw new Error("AI review did not return valid content");
            }

            // ✅ Defensive fallback for invalid riskLevel values
            const riskLevels = ["low", "medium", "high"];
            const isValidRisk = riskLevels.includes(review.riskLevel);

            // 💾 Save to history
            await saveReview({
                prUrl: values.prUrl,
                summary: review.summary,
                riskLevel: isValidRisk ? review.riskLevel : "low",
            });

            // 🔔 Callback to parent (e.g., Dashboard)
            onReviewSuccess({ prUrl: values.prUrl, ...review });

            // 🧹 Reset form
            actions.resetForm();
        } catch (error) {
            const response = error?.response;
            const backendMsg = response?.data?.message || error.message;

            // 🧠 Custom message if backend says GitHub auth is required
            if (
                (response?.status === 401 || response?.status === 403) &&
                backendMsg.toLowerCase().includes("github")
            ) {
                actions.setFieldError("prUrl", "🔒 You must log in with GitHub to review private PRs.");
            } else {
                // 🧠 General error fallback
                actions.setFieldError("prUrl", backendMsg || "Review failed.");
            }

            console.error("Review failed:", error);
        } finally {
            // 🕓 Always reset submitting state
            actions.setSubmitting(false);
        }
    };



    return (
        <motion.div
            className="w-full max-w-xl bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Enter GitHub Pull Request URL
            </h2>

            <Formik
                initialValues={initialValues}
                validationSchema={toFormikValidationSchema(prSchema)}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <Field
                                name="prUrl"
                                type="text"
                                placeholder="https://github.com/user/repo/pull/123"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                            <ErrorMessage
                                name="prUrl"
                                component="div"
                                className="text-sm text-red-500 mt-1"
                            />
                        </div>

                        {isGitHubLogin && (
                            <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <input
                                    type="checkbox"
                                    checked={useGitHubToken}
                                    onChange={() => setUseGitHubToken(!useGitHubToken)}
                                />
                                Use GitHub access for private PRs
                            </label>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Reviewing..." : "Review PR"}
                        </button>
                    </Form>
                )}
            </Formik>
        </motion.div>
    );
}
