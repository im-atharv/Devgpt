// utils/formatRiskLevel.js

/**
 * Returns emoji + styled label for risk levels
 * @param {"low" | "medium" | "high"} level
 */
export function formatRiskLevel(level) {
    switch (level) {
        case "low":
            return { label: "🟢 Low", className: "text-green-600" };
        case "medium":
            return { label: "🟠 Medium", className: "text-yellow-600" };
        case "high":
            return { label: "🔴 High", className: "text-red-600" };
        default:
            return { label: "⚪ Unknown", className: "text-gray-500" };
    }
}
