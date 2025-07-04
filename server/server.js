// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import passport from "./middlewares/passport.js";

import authRoutes from "./routes/authRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

// Middleware
app.use(express.json());

// Sessions (required for GitHub OAuth)
app.use(
    session({
        secret: process.env.SESSION_SECRET || "devgpt-session-secret",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/pdf", pdfRoutes);

// Health
app.get("/", (req, res) => {
    res.send("✅ DevGPT API is running");
});

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected");
        app.listen(PORT, () =>
            console.log(`🚀 Server running on http://localhost:${PORT}`)
        );
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
    });
