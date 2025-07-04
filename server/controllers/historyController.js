import { getReviewsByUser, saveReview } from "../services/historyService.js";
import { sendSuccess, sendError } from "../utils/responseHelpers.js";

/**
 * @route GET /api/history
 * @desc Fetch all reviews for the authenticated user
 */
export const handleGetHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const reviews = await getReviewsByUser(userId);
        return sendSuccess(res, reviews, "History fetched successfully");
    } catch (err) {
        console.error("🛠️ handleGetHistory error:", err);
        return sendError(res, "Failed to fetch history: " + err.message, 500);
    }
};

/**
 * @route POST /api/history
 * @desc Save a new review for the authenticated user
 */
export const handleSaveHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const { prUrl, summary, riskLevel } = req.body;

        if (!prUrl || !summary || !riskLevel) {
            return sendError(res, "prUrl, summary and riskLevel are required", 400);
        }

        const saved = await saveReview({ userId, prUrl, summary, riskLevel });
        return sendSuccess(res, saved, "Review saved successfully");
    } catch (err) {
        console.error("🛠️ handleSaveHistory error:", err.message);
        return sendError(res, "Failed to save review: " + err.message, 500);
    }
};
