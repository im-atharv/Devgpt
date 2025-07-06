import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTAFooterSection() {
    return (
        <section className="relative py-28 px-6 text-center bg-gradient-to-b from-violet-100 to-white dark:from-gray-950 dark:to-gray-900 overflow-hidden">
            {/* Decorative background blur blobs */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/3 left-1/2 w-[400px] h-[400px] bg-purple-500/30 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-pink-500/20 blur-2xl rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10 max-w-3xl mx-auto bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-700 backdrop-blur-md rounded-3xl p-10 shadow-xl"
            >
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                    Start Reviewing Smarter, Not Harder.
                </h2>

                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                    Supercharge your pull request workflow with intelligent, instant AI feedback.
                </p>

                <Link
                    to="/dashboard"
                    className="inline-block relative group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300"
                >
                    <span className="absolute -inset-1 rounded-full bg-purple-400 opacity-0 group-hover:opacity-30 blur transition-all duration-300"></span>
                    <span className="relative z-10">Go to Dashboard →</span>
                </Link>
            </motion.div>
        </section>
    );
}
