// routes/pdfRoutes.js
import express from "express";
import { exportPDF } from "../controllers/pdfController.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = express.Router();

router.post("/export", requireAuth, exportPDF);

export default router;
