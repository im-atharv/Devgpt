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
        const { id: userId, githubToken } = req.user;

        if (!prUrl) {
            return sendError(res, "PR URL is required", 400);
        }

        const isPrivateRequest = useGitHubToken === true;

        // ❌ Reject private repo access if user has no GitHub token
        if (isPrivateRequest && !githubToken) {
            return sendError(res, "You must log in via GitHub to access private repositories.", 403);
        }

        const diff = await fetchPullRequestDiff(prUrl, userId, isPrivateRequest); // ✅
        const aiReview = await generateReviewFromAI(diff);

        return sendSuccess(res, aiReview, "AI Review generated successfully");
    } catch (err) {
        console.error("❌ Review error:", err.message);
        return sendError(res, err.message || "Failed to generate review", 500);
    }
};

