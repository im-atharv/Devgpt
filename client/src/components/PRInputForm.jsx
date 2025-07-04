import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { prSchema } from "../validation/prSchema";
import { submitPRReview } from "../services/reviewService";
import { saveReview } from "../services/historyService";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";

export default function PRInputForm({ onReviewSuccess }) {
    const { isGitHubLogin } = useAuth();
    const [useGitHubToken, setUseGitHubToken] = useState(isGitHubLogin);
    const initialValues = { prUrl: "" };

    const handleSubmit = async (values, actions) => {
        try {
            const apiResponse = await submitPRReview(values.prUrl, useGitHubToken);
            console.log("✅ AI response:", apiResponse);

            const review = apiResponse?.message;

            // Check if required fields are present
            if (!review || !review.summary || !review.riskLevel) {
                console.error("❌ Missing review fields", review);
                throw new Error("AI review did not return valid content");
            }

            // Defensive fallback (optional, if AI sometimes returns invalid risk levels)
            const riskLevels = ["low", "medium", "high"];
            const isValidRisk = riskLevels.includes(review.riskLevel);

            await saveReview({
                prUrl: values.prUrl,
                summary: review.summary,
                riskLevel: isValidRisk ? review.riskLevel : "low", // fallback if needed
            });

            onReviewSuccess({ prUrl: values.prUrl, ...review });
            actions.resetForm();
        } catch (error) {
            console.error("Review failed:", error);
            const message = error?.response?.data?.message || error.message || "Review failed.";
            actions.setFieldError("prUrl", message);
        } finally {
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
