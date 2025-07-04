import express from "express";
import { handlePRReview } from "../controllers/reviewController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { prReviewSchema } from "../validation/prReviewSchema.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = express.Router();

router.post("/", requireAuth, validateRequest(prReviewSchema), handlePRReview);

export default router;
