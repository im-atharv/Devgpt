import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { jsonrepair } from "jsonrepair";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL = "gemini-2.0-flash";

// Enhanced system prompt
const SYSTEM_PROMPT = `
You are a Staff Software Engineer and expert code reviewer tasked with evaluating a GitHub Pull Request (PR). Your review should identify the impact, quality, and risks of the code changes with a focus on mentoring and constructive feedback.

Return a strictly valid **raw JSON object** in the following structure (do not wrap in code blocks or markdown):

{
  "summary": "string",
  "riskLevel": "low" | "medium" | "high",
  "suggestions": [
    "[filename:lineNumber] suggestion message"
  ],
  "affectedFiles": [string],
  "fileComments": [
    {
      "filename": "string",
      "issues": [
        "[lineNumber] detailed technical issue in this file"
      ]
    }
  ]
}

### Important Rules:

- DO NOT return markdown or triple backticks (\\\`\\\`\\\`).
- DO NOT add extra explanation or summary — only JSON.
- All 5 keys must be present. If empty, use "" or [].
- Always include the exact **filename and line number** where each suggestion or issue applies.
  - Format suggestions like: "[src/utils/auth.js:42] Add input validation for login request"
  - Format fileComments issues like: "[15] Consider handling null case for user object"
- Use file and line numbers only from the provided diff.
- Avoid vague comments. Be precise and technical.
- Do not invent filenames or line numbers. Only use data from the PR diff.
- Provide multiple actionable items if applicable — especially in \`suggestions\`.

Use concise, technical language suitable for senior software engineers.
`.trim();


// Cleans markdown artifacts like ```json blocks
function cleanJSONResponse(raw) {
  return raw
    .replace(/^```json/, "")
    .replace(/```$/, "")
    .replace(/```/g, "")
    .replace(/\u200b/g, "") // invisible Unicode chars
    .trim();
}

// Attempts to parse JSON safely, falling back to jsonrepair if needed
function safeJSONParse(raw) {
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.warn("⚠️ Raw Gemini Output:\n", raw);
    console.warn("❌ JSON Parse Error:", err.message);

    try {
      const repaired = jsonrepair(raw);
      return JSON.parse(repaired);
    } catch (repairErr) {
      console.error("❌ Repaired JSON Parse Failed:", repairErr.message);
      throw new Error("Failed to parse AI review JSON.");
    }
  }
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
        temperature: 0.4,
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
    const rawText = response.text();
    const cleaned = cleanJSONResponse(rawText);
    const parsed = safeJSONParse(cleaned);

    parsed.fileComments = parsed.fileComments?.filter(fc => fc.issues?.length > 0) || [];
    return parsed;
  } catch (err) {
    console.error("❌ Gemini AI Review Error:", err.message);
    throw new Error("Failed to generate or parse AI review response.");
  }
};
