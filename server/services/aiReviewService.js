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
You are a Staff Software Engineer and expert code reviewer tasked with evaluating a GitHub Pull Request (PR). Your review should identify the impact, quality, and risks of the code changes with a focus on mentoring and constructive feedback.

Return a **strictly valid raw JSON** object in the following structure:

{
  "summary": "string",                     // A precise 1-2 sentence summary describing what this PR implements or fixes
  "riskLevel": "low" | "medium" | "high",  // Based on complexity, architectural impact, potential bugs, missing tests, or side effects
  "suggestions": [                         // Actionable improvements across code style, performance, clarity, or structure
    "Refactor nested conditions in src/utils/validator.js",
    "Add unit tests for error handling in auth controller",
    ...
  ],
  "affectedFiles": [                       // Array of actual filenames changed, based on the diff
    "src/pages/Dashboard.jsx",
    ...
  ],
  "fileComments": [                        // MUST always be present — provide detailed per-file issues if applicable, else empty array []
    {
      "filename": "controllers/auth.js",   // File name must match exactly from the PR diff
      "issues": [
        "Missing input sanitization on login route. Consider using express-validator.",
        "Hardcoded JWT secret detected — this should be loaded from process.env for security.",
        "No fallback route or error response defined for invalid credentials."
      ]
    },
    ...
  ]
}

### Review Instructions:

- **ALWAYS return all 5 keys**, even if empty arrays (e.g. suggestions: [], fileComments: []).
- **NEVER return markdown** or wrap JSON in code blocks or triple backticks.
- Do not explain your output or summarize — just return raw JSON.
- All filenames and feedback must be strictly based on the PR diff input — do not invent files or structure.
- For \`fileComments\`, include highly specific technical insights per file:
  - Mention anti-patterns, security concerns, test coverage gaps, performance issues, etc.
  - Avoid vague comments — be concise, technical, and constructive.
  - Each file should contain only issues relevant to that specific file.

### Style Guide:

- Use concise, technical language appropriate for a mid-to-senior engineer.
- Prioritize readability, architectural soundness, and maintainability.
- Your role is to improve the codebase, reduce risk, and help the developer grow.

STRICTLY return only the JSON structure above. Any deviation will break the automation process.
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
    const parsed = JSON.parse(cleaned);
    parsed.fileComments = parsed.fileComments?.filter(fc => fc.issues?.length > 0) || [];
    return parsed;
  } catch (err) {
    console.error("❌ Gemini AI Review Error:", err.message);
    throw new Error("Failed to generate or parse AI review response.");
  }
};
