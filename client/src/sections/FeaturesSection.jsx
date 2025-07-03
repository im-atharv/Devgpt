import React from "react";
import { motion } from "framer-motion";

const features = [
    {
        emoji: "🧠",
        title: "AI Review Summary",
        desc: "Understand what changed, potential risks, and testing suggestions in seconds.",
    },
    {
        emoji: "🐞",
        title: "Bug & Risk Detection",
        desc: "Automatically detect risky logic, missing validations, and code smells.",
    },
    {
        emoji: "📁",
        title: "PR History & Export",
        desc: "Keep track of past PRs and export summaries to PDF or Markdown.",
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-16 px-6 bg-white dark:bg-gray-900">
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * i }}
                        viewport={{ once: true }}
                    >
                        <div className="text-4xl mb-3">{f.emoji}</div>
                        <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
