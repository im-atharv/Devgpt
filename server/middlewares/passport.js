// middlewares/passport.js
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import { User } from "../models/User.js";

dotenv.config();

// GitHub OAuth Strategy Setup
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/api/auth/github/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const githubId = profile.id;
                const email = profile.emails?.[0]?.value || `${githubId}@github.com`; // fallback if email is not public
                const name = profile.displayName || profile.username;
                const avatar = profile.photos?.[0]?.value || null;

                // Find user by GitHub ID or email
                let user = await User.findOne({
                    $or: [{ githubId }, { email }],
                });

                if (!user) {
                    // Create new user with GitHub credentials
                    user = await User.create({
                        githubId,
                        name,
                        email,
                        avatar,
                        password: null, // No password for GitHub-authenticated users
                        githubToken: accessToken, // ✅ Store GitHub token for API use
                    });
                } else {
                    // Update GitHub info and token
                    user.githubId = githubId;
                    user.avatar = avatar || user.avatar;
                    user.githubToken = accessToken; // ✅ Always update token on login
                    await user.save();
                }

                return done(null, user);
            } catch (err) {
                console.error("❌ GitHub OAuth error:", err);
                return done(err, null);
            }
        }
    )
);

// Required by Passport (even if we use JWT manually)
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;
