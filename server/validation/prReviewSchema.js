import { z } from "zod";

export const prReviewSchema = z.object({
    prUrl: z
        .string()
        .url("Invalid GitHub PR URL")
        .refine((url) => url.includes("github.com") && url.includes("/pull/"), {
            message: "Must be a valid GitHub Pull Request URL",
        }),
    useGitHubToken: z.boolean().optional(),
});
