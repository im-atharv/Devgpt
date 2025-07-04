// validation/historySchema.js
import { z } from "zod";

export const saveHistorySchema = z.object({
  prUrl: z.string().url("Valid PR URL required"),
  summary: z.string().min(10, "Summary is too short"),
  riskLevel: z.enum(["low", "medium", "high"]),
});
