// services/aiReviewService.js
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL = "gemini-1.5-flash-latest";

/**
 * Production-grade system prompt to extract structured, high-quality PR reviews.
 */
const SYSTEM_PROMPT = `
You are an experienced Staff Software Engineer specializing in code reviews, architecture, and best practices.

Your task is to review the provided GitHub Pull Request (PR) and return a strict JSON object with the following structure:

{
  "summary": "string",                     // Concise 1-2 sentence summary of what the PR implements or fixes
  "riskLevel": "low" | "medium" | "high",  // Based on complexity, test coverage, side effects, or architectural impact
  "suggestions": [                         // Actionable and specific suggestions to improve quality or performance
    "Avoid deeply nested conditionals in file A.js",
    "Add missing validation in user input in auth route",
    ...
  ],
  "affectedFiles": [                       // List of actual filenames changed, based on the diff
    "src/components/Button.jsx",
    ...
  ],
  "fileComments": [                        // Optional per-file in-depth comments, only if issues found
    {
      "filename": "routes/auth.js",
      "issues": [
        "JWT token secret should be in environment variables.",
        "Add error handling for invalid login attempts."
      ]
    },
    ...
  ]
}

### Instructions:
- Only return raw JSON. No explanations, markdown, headers, or text outside the JSON.
- Be critical but constructive: assume you're mentoring a mid-level developer.
- Do NOT fabricate filenames — base all analysis only on actual diff contents.
- Mention architectural risks, code smells, unhandled edge cases, and missing tests where applicable.

Your goal is to help improve code quality while identifying risks. Focus on clarity, impact, and relevance.
`.trim();

/**
 * Utility to clean Gemini's response if wrapped in ```json ``` block
 */
function cleanJSONResponse(raw) {
    return raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
}

/**
 * Generates a PR review using Gemini AI based on diff and metadata.
 * @param {Object} context - Metadata and file diff for the PR
 * @returns {Promise<Object>} Parsed review response
 */
export const generateReviewFromAI = async (context) => {
    try {
        const model = genAI.getGenerativeModel({
            model: MODEL,
            generationConfig: {
                temperature: 0.4, // lower temp = more deterministic
                topK: 40,
                topP: 0.9,
                maxOutputTokens: 2048,
            },
        });

        const { repo, prNumber, title, body, baseBranch, headBranch, files } = context;

        const fileDiffs = files
            .map(
                (file) =>
                    `### File: ${file.filename}\n\`\`\`diff\n${file.patch}\n\`\`\``
            )
            .join("\n\n");

        const fullPrompt = `
${SYSTEM_PROMPT}

Repository: ${repo}
Pull Request #: ${prNumber}
Title: ${title}
Description: ${body}
Base Branch: ${baseBranch}
Compare Branch: ${headBranch}

Changed Files and Diffs:
${fileDiffs}
`.trim();

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const cleaned = cleanJSONResponse(response.text());

        return JSON.parse(cleaned);
    } catch (err) {
        console.error("❌ Gemini AI Review Error:", err.message);
        throw new Error("Failed to generate or parse AI review response.");
    }
};
