// routes/authRoutes.js
import express from "express";
import {
    handleRegister,
    handleLogin,
    githubCallbackController,
} from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { registerSchema, loginSchema } from "../validation/authSchema.js";
import passport from "../middlewares/passport.js";

const router = express.Router();

// Local auth
router.post("/register", validateRequest(registerSchema), handleRegister);
router.post("/login", validateRequest(loginSchema), handleLogin);

// GitHub OAuth
router.get(
    "/github",
    passport.authenticate("github", { scope: ["read:user", "repo"] })
);

router.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    githubCallbackController
);

export default router;
