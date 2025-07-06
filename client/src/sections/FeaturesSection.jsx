import React from "react";
import { motion } from "framer-motion";

const features = [
    {
        emoji: "🧠",
        title: "AI Review Summary",
        desc: "Get clear, concise summaries of PRs with risks and improvement tips.",
    },
    {
        emoji: "🐞",
        title: "Bug & Risk Detection",
        desc: "Catch logical flaws, missing validations, and potential bugs automatically.",
    },
    {
        emoji: "📁",
        title: "History & PDF Export",
        desc: "Track all reviewed PRs and export them in clean, professional formats.",
    },
];

export default function FeaturesSection() {
    return (
        <section className="relative py-24 px-6 bg-gradient-to-b from-blue-50 to-purple-100 dark:from-gray-950 dark:to-gray-900 overflow-hidden">
            {/* Soft glow accents */}
            <div className="absolute left-1/4 top-0 w-[300px] h-[300px] bg-blue-300/20 blur-2xl rounded-full z-0" />
            <div className="absolute right-1/3 bottom-0 w-[250px] h-[250px] bg-purple-400/20 blur-2xl rounded-full z-0" />

            <div className="relative z-10 max-w-6xl mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-10">
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        className="bg-white/70 dark:bg-gray-800/60 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 backdrop-blur-md shadow-xl transition hover:shadow-2xl hover:scale-[1.02] duration-300"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 * i, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="text-5xl mb-4"
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ repeat: Infinity, duration: 3, delay: 0.5 + i }}
                        >
                            {f.emoji}
                        </motion.div>
                        <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                            {f.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                            {f.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
