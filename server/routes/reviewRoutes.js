import express from "express";
import { handlePRReview } from "../controllers/reviewController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { prReviewSchema } from "../validation/prReviewSchema.js";

const router = express.Router();

// POST /api/review
router.post("/", validateRequest(prReviewSchema), handlePRReview);

export default router;
