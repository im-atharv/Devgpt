// services/reviewService.js
import axiosInstance from "./axiosInstance";

/**
 * Submits a GitHub PR URL for AI review
 * @param {string} prUrl - The full URL of the pull request to be reviewed.
 * @returns {Promise<Object>} - AI-generated review including suggestions/comments.
 */
export const submitPRReview = async (prUrl) => {
    const token = localStorage.getItem("devgpt-token");

    const response = await axiosInstance.post(
        "/review",
        { prUrl },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data; // contains .message
};
