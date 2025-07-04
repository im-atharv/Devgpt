import express from "express";
import passport from "passport";

const router = express.Router();

// 1. Redirect user to GitHub OAuth
router.get("/github", passport.authenticate("github", { scope: ["repo", "read:user"] }));

// 2. GitHub redirects back here
router.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/login", // frontend route
        session: false, // disable session if using JWT
    }),
    (req, res) => {
        // 🔐 Your logic to store GitHub access token, or send it via JWT
        res.redirect("http://localhost:3000/github-auth-success"); // or pass token as query param
    }
);

export default router;
