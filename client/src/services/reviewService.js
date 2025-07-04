// services/reviewService.js
import axiosInstance from "./axiosInstance";

export const submitPRReview = async (prUrl, useGitHubToken = true) => {
    const token = localStorage.getItem("devgpt-token");

    const response = await axiosInstance.post(
        "/review",
        {
            prUrl,
            useGitHubToken, // this must be true for private repos
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
