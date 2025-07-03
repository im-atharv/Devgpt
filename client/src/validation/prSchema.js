// validation/prSchema.js
import { z } from "zod";

export const prSchema = z.object({
    prUrl: z
        .string()
        .url("Please enter a valid GitHub PR URL.")
        .refine((url) => url.includes("github.com") && url.includes("/pull/"), {
            message: "URL must be a valid GitHub Pull Request.",
        }),
});
