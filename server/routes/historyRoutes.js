import express from "express";
import {
    handleGetHistory,
    handleSaveHistory,
} from "../controllers/historyController.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { saveHistorySchema } from "../validation/historySchema.js";

const router = express.Router();

router.get("/", requireAuth, handleGetHistory);

router.post("/", requireAuth, validateRequest(saveHistorySchema), handleSaveHistory);

export default router;
