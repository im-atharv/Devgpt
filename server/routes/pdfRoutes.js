// routes/pdfRoutes.js
import express from "express";
import { exportPDF } from "../controllers/pdfController.js";

const router = express.Router();

router.post("/export", exportPDF);

export default router;
