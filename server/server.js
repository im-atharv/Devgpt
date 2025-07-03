import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import pdfRoutes from "./routes/pdfRoutes.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", URLcredentials: true }));
app.use(express.json());
app.use("/api/pdf", pdfRoutes);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/history", historyRoutes);

// Health check
app.get("/", (req, res) => {
    res.send("✅ DevGPT API is running");
});

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
    });
