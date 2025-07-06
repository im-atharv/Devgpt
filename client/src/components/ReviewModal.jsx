// components/ReviewModal.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ReviewModal({ isOpen, onClose, review }) {
    return (
        <AnimatePresence>
            {isOpen && (
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

                        <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">
                            Full Review
                        </h2>
                        <a
                            href={review.prUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm font-mono text-blue-500 underline break-all mb-2"
                        >
                            {review.prUrl}
                        </a>

                        <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                            {review.summary || "No detailed summary provided."}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
