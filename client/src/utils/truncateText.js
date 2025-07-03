// utils/truncateText.js

/**
 * Truncates text after a certain length with ellipsis
 * @param {string} text
 * @param {number} maxLength
 */
export function truncateText(text, maxLength = 150) {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
}
