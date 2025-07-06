// models/Review.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        prUrl: {
            type: String,
            required: true,
        },
        summary: {
            type: String,
            required: true,
        },
        riskLevel: {
            type: String,
            enum: ["low", "medium", "high"],
            required: true,
        },
        suggestions: {
            type: [String],
            default: [],
        },
        affectedFiles: {
            type: [String],
            default: [],
        },
        fileComments: [
            {
                filename: String,
                issues: [String],
            },
        ],
    },
    { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
