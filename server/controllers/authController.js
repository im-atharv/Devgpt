import { registerUser, loginUser } from "../services/authService.js";
import { sendSuccess, sendError } from "../utils/responseHelpers.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Local register
export const handleRegister = async (req, res) => {
    try {
        const data = await registerUser(req.body);
        return sendSuccess(res, data, "Registration successful");
    } catch (err) {
        return sendError(res, err.message, 400);
    }
};

// Local login
export const handleLogin = async (req, res) => {
    try {
        const data = await loginUser(req.body);
        return sendSuccess(res, data, "Login successful");
    } catch (err) {
        return sendError(res, err.message, 401);
    }
};

// GitHub OAuth callback
export const githubCallbackController = async (req, res) => {
    try {
        const user = req.user;

        const payload = {
            userId: user._id,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

        const redirectUrl = `http://localhost:5173/github-success?token=${token}&name=${encodeURIComponent(
            user.name
        )}&email=${encodeURIComponent(user.email || "")}`;

        return res.redirect(redirectUrl);
    } catch (err) {
        console.error("❌ GitHub login error:", err.message);
        return res.redirect("/login");
    }
};
