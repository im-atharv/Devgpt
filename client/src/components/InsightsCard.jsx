import React from "react";
import { motion } from "framer-motion";
import { INSIGHT_FEATURES } from "../constants.js";

export default function InsightsCard() {
    return (
        <motion.div
            className="w-full md:w-1/2 h-full flex flex-col justify-between bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-2xl space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Why DevGPT?
            </h3>

            <ul className="space-y-4">
                {INSIGHT_FEATURES.map(({ icon: Icon, iconColor, title, description }, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                        <div className={`flex-shrink-0 p-2 rounded-full bg-gray-100 dark:bg-gray-800 ${iconColor}`}>
                            <Icon size={22} />
                        </div>
                        <div>
                            <h4 className="text-md font-medium text-gray-900 dark:text-white">{title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
                🧠 Tip: Use GitHub login for reviewing private pull requests.
            </div>
        </motion.div>
    );
}
