import express from "express";
import { handleRegister, handleLogin } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { registerSchema, loginSchema } from "../validation/authSchema.js";

const router = express.Router();

router.post("/register", validateRequest(registerSchema), handleRegister);
router.post("/login", validateRequest(loginSchema), handleLogin);

export default router;
