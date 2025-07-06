import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <section className="relative py-28 px-6 md:px-12 text-center bg-gradient-to-b from-violet-100 to-blue-50 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
            {/* Glowing background blobs */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full z-0" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-400/20 blur-[100px] rounded-full z-0" />

            <motion.div
                className="relative z-10 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
                    Supercharge Your Code Reviews with{" "}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        DevGPT
                    </span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-8">
                    Paste your GitHub PR, and let AI instantly summarize, spot bugs, and suggest improvements — all in seconds.
                </p>

                <Link
                    to="/dashboard"
                    className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-2xl transition-transform hover:scale-105 duration-300"
                >
                    🚀 Try It Now
                </Link>
            </motion.div>
        </section>
    );
}
