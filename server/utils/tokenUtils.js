// utils/tokenUtils.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "devgpt-default-secret";

/**
 * Create JWT token for authenticated user
 * @param {Object} payload - typically { userId, email }
 * @param {String} expiresIn - optional (default: 7d)
 * @returns {String} JWT token
 */
export const createJWT = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};
