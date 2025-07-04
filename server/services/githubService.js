// services/githubService.js
import axios from "axios";
import { User } from "../models/User.js";

export const fetchPullRequestDiff = async (prUrl, userId, useGitHubToken = false) => {
    const match = prUrl.match(
        /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/
    );
    if (!match) {
        throw new Error("Invalid PR URL");
    }

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
        const filesResponse = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}/files`,
            { headers }
        );

        const files = filesResponse.data;

        if (!files.length) throw new Error("PR has no changed files");

        const diff = files
            .map((file) => `### File: ${file.filename}\n\`\`\`diff\n${file.patch || ""}\n\`\`\``)
            .join("\n\n");

        return diff;
    } catch (err) {
        console.error("❌ GitHub API error:", err.response?.data || err.message);
        if (err.code === "GITHUB_AUTH_REQUIRED") {
            throw err;
        }
        throw new Error("Failed to fetch PR diff from GitHub.");
    }
};
