import { fetchPRContext } from "../services/githubService.js";
import { generateReviewFromAI } from "../services/aiReviewService.js";
import { sendSuccess, sendError } from "../utils/responseHelpers.js";

export const handlePRReview = async (req, res) => {
    try {
        const { prUrl, useGitHubToken } = req.body;
        const userId = req.user.id;

        if (!prUrl) return sendError(res, "PR URL is required", 400);

        const prContext = await fetchPRContext(prUrl, userId, useGitHubToken);
        const review = await generateReviewFromAI(prContext);

        return sendSuccess(res, review, "AI Review generated successfully");
    } catch (err) {
        console.error("❌ Review error:", err.message);

        if (err.code === "GITHUB_AUTH_REQUIRED") {
            return sendError(res, err.message, 403);
        }

        return sendError(res, err.message || "Failed to generate review", 500);
    }
};
