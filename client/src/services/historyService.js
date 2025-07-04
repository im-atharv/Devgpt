import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000", // Adjust if using env vars
});

// Save review
export const saveReview = async ({ prUrl, summary, riskLevel }) => {
    const token = localStorage.getItem("devgpt-token");

    const response = await API.post(
        "/api/history",
        { prUrl, summary, riskLevel },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data.message;
};

// Fetch review history
export const getReviewHistory = async () => {
    const token = localStorage.getItem("devgpt-token");

    const response = await API.get("/api/history", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data.message;
};
