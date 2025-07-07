import { Review } from "../models/Review.js";

export async function saveReview({ userId, prUrl, summary, riskLevel, suggestions, affectedFiles, fileComments }) {
    return await Review.create({
        userId,
        prUrl,
        summary,
        riskLevel,
        suggestions,
        affectedFiles,
        fileComments,
    });
}

export async function getReviewsByUser(userId) {
    return await Review.find({ userId }).sort({ createdAt: -1 });
}
