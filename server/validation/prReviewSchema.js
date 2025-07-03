import { z } from "zod";

export const prReviewSchema = z.object({
    prUrl: z
        .string()
        .url("Enter a valid GitHub PR URL")
        .regex(/github\.com\/.*\/pull\/\d+/, "Must be a GitHub Pull Request URL"),
});
