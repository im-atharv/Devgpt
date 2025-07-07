import jwt from "jsonwebtoken";
import { sendError } from "../utils/responseHelpers.js";
import { User } from "../models/User.js";

/**
 * Middleware to validate JWT and attach user info to request
 * - Attaches: req.user = { id, email, githubToken }
 */
export const requireAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return sendError(res, "Unauthorized: No token provided", 401);
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return sendError(res, "Unauthorized: User not found", 401);
        }

        req.user = {
            id: user._id,
            email: user.email,
            githubToken: user.githubToken || null,
            isGitHubLogin: !!user.githubToken, 
        };


        next();
    } catch (err) {
        console.error("❌ JWT verification failed:", err.message);
        return sendError(res, "Unauthorized: Invalid or expired token", 401);
    }
};
