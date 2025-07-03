// services/githubService.js
import { Octokit } from "@octokit/rest";
import { parse } from "url";

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN || undefined,
});

function parseGitHubPRUrl(prUrl) {
    try {
        const parsed = parse(prUrl).pathname.split("/");
        const owner = parsed[1];
        const repo = parsed[2];
        const pull_number = parseInt(parsed[4], 10);

        if (!owner || !repo || isNaN(pull_number)) {
            throw new Error("Invalid PR URL structure.");
        }

        return { owner, repo, pull_number };
    } catch (err) {
        throw new Error("Failed to parse GitHub PR URL.");
    }
}

export async function fetchPullRequestDiff(prUrl) {
    const { owner, repo, pull_number } = parseGitHubPRUrl(prUrl);

    try {
        const { data: files } = await octokit.pulls.listFiles({
            owner,
            repo,
            pull_number,
        });

        let diffOutput = "";

        for (const file of files) {
            diffOutput += `\n\n📄 File: ${file.filename}\n`;
            if (file.patch) {
                diffOutput += file.patch;
            } else {
                diffOutput += "⚠️ File too large or binary. No diff available.\n";
            }
        }

        return diffOutput.trim();
    } catch (err) {
        console.error("❌ GitHub API error:", err.message);
        throw new Error("Failed to fetch PR diff from GitHub.");
    }
}
