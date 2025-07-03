// client/src/sections/HeroSection.jsx

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <section className="py-20 px-4 md:px-10 text-center">
            <motion.h1
                className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Empower Your Code Reviews with{" "}
                <span className="text-blue-600 dark:text-blue-400">DevGPT</span>
            </motion.h1>

            <motion.p
                className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Paste your GitHub PR, and let AI summarize, review, and highlight bugs or improvements instantly.
            </motion.p>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <Link
                    to="/dashboard"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-full transition"
                >
                    Try It Now
                </Link>
            </motion.div>
        </section>
    );
}
