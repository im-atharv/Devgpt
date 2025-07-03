import Review from "../models/Review.js";

// Save
export async function saveReview({ userId, prUrl, summary, riskLevel }) {
    return await Review.create({
        userId,
        prUrl,
        summary,
        riskLevel,
    });
}

// Get
export async function getReviewsByUser(userId) {
    return await Review.find({ userId }).sort({ createdAt: -1 });
}
