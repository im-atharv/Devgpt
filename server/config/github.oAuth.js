// config/githubOAuth.js
import passport from "passport";
import GitHubStrategy from "passport-github2";
import User from "../models/User.js";
import { createJWT } from "../utils/tokenUtils.js";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const CALLBACK_URL = process.env.GITHUB_CALLBACK_URL || "http://localhost:5000/api/auth/github/callback";

passport.use(
    new GitHubStrategy(
        {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await User.findOne({ githubId: profile.id });

                if (existingUser) {
                    return done(null, existingUser);
                }

                // If user already exists by email (from normal auth), link accounts
                const existingByEmail = await User.findOne({ email: profile.emails?.[0]?.value });

                if (existingByEmail) {
                    existingByEmail.githubId = profile.id;
                    existingByEmail.avatar = profile.photos?.[0]?.value;
                    await existingByEmail.save();
                    return done(null, existingByEmail);
                }

                // Otherwise create new user
                const newUser = await User.create({
                    githubId: profile.id,
                    email: profile.emails?.[0]?.value,
                    name: profile.displayName || profile.username,
                    avatar: profile.photos?.[0]?.value,
                });

                return done(null, newUser);
            } catch (err) {
                console.error("GitHub OAuth Error:", err);
                done(err, null);
            }
        }
    )
);

// Serialize and deserialize user for session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
