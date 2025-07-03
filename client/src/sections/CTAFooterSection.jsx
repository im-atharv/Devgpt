import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import { motion } from "framer-motion";

export default function CTAFooterSection() {
    return (
        <section className="py-20 px-4 text-center bg-gray-50 dark:bg-gray-950">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
            >
                <SectionTitle text="Start Reviewing Smarter, Not Harder." />

                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    Your code deserves better feedback. Let AI handle the review — you focus on building.
                </p>

                <Link
                    to="/dashboard"
                    className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-6 py-3 rounded-full transition duration-200"
                >
                    Go to Dashboard →
                </Link>
            </motion.div>
        </section>
    );
}
