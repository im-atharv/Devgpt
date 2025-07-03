import { registerUser, loginUser } from "../services/authService.js";
import { sendSuccess, sendError } from "../utils/responseHelpers.js";

export const handleRegister = async (req, res) => {
    try {
        const data = await registerUser(req.body);
        return sendSuccess(res, data, "Registration successful");
    } catch (err) {
        return sendError(res, err.message, 400);
    }
};

export const handleLogin = async (req, res) => {
    try {
        const data = await loginUser(req.body);
        return sendSuccess(res, data, "Login successful");
    } catch (err) {
        return sendError(res, err.message, 401);
    }
};
