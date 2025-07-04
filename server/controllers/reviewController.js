import { fetchPullRequestDiff } from "../services/githubService.js";
import { generateReviewFromAI } from "../services/aiReviewService.js";
import { sendSuccess, sendError } from "../utils/responseHelpers.js";

/**
 * @route POST /api/review
 * @desc Accepts a GitHub PR URL, fetches the diff, sends to AI, returns review
 */
export const handlePRReview = async (req, res) => {
    try {
        const { prUrl, useGitHubToken } = req.body;
        const userId = req.user.id;

        if (!prUrl) {
            return sendError(res, "PR URL is required", 400);
        }

        const diff = await fetchPullRequestDiff(prUrl, userId, useGitHubToken);
        const aiReview = await generateReviewFromAI(diff);

        return sendSuccess(res, aiReview, "AI Review generated successfully");
    } catch (err) {
        console.error("❌ Review error:", err.message);

        // Custom GitHub login error handling
        if (err.code === "GITHUB_AUTH_REQUIRED") {
            return sendError(res, err.message, 403);
        }

        return sendError(res, err.message || "Failed to generate review", 500);
    }
};


