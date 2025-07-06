// services/githubService.js
import axios from "axios";
import { User } from "../models/User.js";

export const fetchPRContext = async (prUrl, userId, useGitHubToken = false) => {
    const match = prUrl.match(
        /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/
    );
    if (!match) throw new Error("Invalid PR URL");

    const [_, owner, repo, pullNumber] = match;

    let headers = {
        Accept: "application/vnd.github.v3+json",
    };

    if (useGitHubToken && userId) {
        const user = await User.findById(userId);
        if (!user || !user.githubToken) {
            const err = new Error("You must log in with GitHub to review private PRs.");
            err.code = "GITHUB_AUTH_REQUIRED";
            throw err;
        }
        headers.Authorization = `Bearer ${user.githubToken}`;
    }

    try {
        // PR metadata
        const prRes = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`,
            { headers }
        );
        const { title, body, base, head } = prRes.data;

        // Changed files
        const filesRes = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/files`,
            { headers }
        );

        const files = filesRes.data.map(file => ({
            filename: file.filename,
            status: file.status,
            patch: file.patch || "",
        }));

        return {
            repo: `${owner}/${repo}`,
            prNumber: pullNumber,
            title,
            body,
            baseBranch: base.ref,
            headBranch: head.ref,
            files,
        };
    } catch (err) {
        console.error("❌ GitHub API error:", err.response?.data || err.message);
        throw err.code === "GITHUB_AUTH_REQUIRED" ? err : new Error("Failed to fetch PR context from GitHub.");
    }
};
