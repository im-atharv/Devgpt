import React from "react";
import { motion } from "framer-motion";

export default function Card({ children, className = "" }) {
  return (
    <motion.div
      className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 transition-all ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
