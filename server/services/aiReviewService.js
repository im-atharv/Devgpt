// services/aiReviewService.js
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL = "gemini-1.5-flash-latest";

const SYSTEM_PROMPT = `You are a senior software engineer reviewing a GitHub Pull Request.
Return ONLY a valid JSON with the following keys:
- summary (string): What this PR does
- riskLevel (string): "low", "medium", or "high"
- suggestions (string[]): Code improvement suggestions
- affectedFiles (string[]): Changed files (inferred from diff)
Do NOT use markdown or explanations. Return ONLY raw JSON.`;

/**
 * Strips markdown ```json code blocks if present
 */
function cleanJSONResponse(raw) {
    return raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
}

export const generateReviewFromAI = async (diff) => {
    try {
        const model = genAI.getGenerativeModel({ model: MODEL });

        const prompt = `${SYSTEM_PROMPT}\n\nHere is the PR diff:\n\n\`\`\`diff\n${diff.slice(
            0,
            12000
        )}\n\`\`\``;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawOutput = response.text().trim();

        const clean = cleanJSONResponse(rawOutput);
        const json = JSON.parse(clean);

        return json;
    } catch (err) {
        console.error("❌ Gemini AI Review Error:", err.message);
        throw new Error("❌ Failed to generate or parse AI review response.");
    }
};
