import jwt from "jsonwebtoken";
import { sendError } from "../utils/responseHelpers.js";

export const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return sendError(res, "Unauthorized: No token provided", 401);
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error("❌ JWT verification failed:", err.message);
        return sendError(res, "Unauthorized: Invalid or expired token", 401);
    }
};
