// utils/extractRepoInfo.js

/**
 * Extracts { owner, repo, pull_number } from a GitHub PR URL
 * @param {string} url
 * @returns { owner: string, repo: string, number: string }
 */
export function extractRepoInfo(url) {
    try {
        const match = url.match(
            /github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/
        );
        if (!match) throw new Error("Invalid GitHub PR URL");

        const [, owner, repo, number] = match;
        return { owner, repo, number };
    } catch (err) {
        console.error("Failed to extract repo info:", err);
        return null;
    }
}
