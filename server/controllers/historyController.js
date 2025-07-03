import { getReviewsByUser, saveReview } from "../services/historyService.js";
import { sendSuccess, sendError } from "../utils/responseHelpers.js";

export const handleGetHistory = async (req, res) => {
    try {
        const reviews = await getReviewsByUser(req.userId);
        return sendSuccess(res, reviews, "History fetched successfully");
    } catch (err) {
        console.error("🛠️ handleGetHistory error:", err);
        return sendError(res, "Failed to fetch history: " + err.message, 500);
    }
};

export const handleSaveHistory = async (req, res) => {
    try {
        const userId = req.userId;
        const { prUrl, summary, riskLevel } = req.body;

        if (!prUrl || !summary || !riskLevel) {
            return sendError(res, "prUrl, summary and riskLevel are required", 400);
        }

        const saved = await saveReview({ userId, prUrl, summary, riskLevel });
        return sendSuccess(res, saved, "Review saved successfully");
    } catch (err) {
        return sendError(res, err.message, 500);
    }
};