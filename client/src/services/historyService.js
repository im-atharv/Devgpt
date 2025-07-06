// services/historyService.js
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000", // Update with env in production
});

// Save full review
export const saveReview = async ({
    prUrl,
    summary,
    riskLevel,
    suggestions = [],
    affectedFiles = [],
    fileComments = [],
}) => {
    const token = localStorage.getItem("devgpt-token");

    const response = await API.post(
        "/api/history",
        { prUrl, summary, riskLevel, suggestions, affectedFiles, fileComments },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data.message;
};

// Get review history
export const getReviewHistory = async () => {
    const token = localStorage.getItem("devgpt-token");

    const response = await API.get("/api/history", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.message;
};
