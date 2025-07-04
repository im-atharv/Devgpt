import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: false,
            unique: true,
            sparse: true,
        },
        password: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        avatar: {
            type: String,
        },
        githubId: {
            type: String,
            unique: true,
            sparse: true,
        },
        githubToken: {
            type: String,
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
