import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    prUrl: { type: String, required: true },
    summary: { type: String },
    riskLevel: { type: String, enum: ["low", "medium", "high"], default: "low" },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Review", reviewSchema);
