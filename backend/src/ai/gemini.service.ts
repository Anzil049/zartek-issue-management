import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';
import { env } from '../config/env.js';
import { Comment } from '../models/Comment.js';
import { Issue } from '../models/Issue.js';
import { HttpError } from '../utils/http.js';

const analysisSchema = z.object({
  summary: z.string().min(1),
  possibleRootCause: z.string().min(1),
  severityAssessment: z.string().min(1),
  suggestedFixes: z.array(z.string().min(1)).min(1).max(6)
});

const fallbackAnalysis = {
  summary: 'AI analysis is unavailable because the Gemini API key is not configured.',
  possibleRootCause: 'Configuration is missing on the backend service.',
  severityAssessment: 'Unknown until Gemini analysis is available.',
  suggestedFixes: ['Set GEMINI_API_KEY in backend/.env.', 'Restart the backend server.', 'Run the analysis again.']
};

const extractJson = (text: string) => {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Gemini response did not contain JSON');
  return JSON.parse(match[0]) as unknown;
};

const withRetry = async <T>(fn: () => Promise<T>, retries = 2): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, 500 * (3 - retries)));
    return withRetry(fn, retries - 1);
  }
};

export const generateIssueAnalysis = async (issueId: string) => {
  const issue = await Issue.findById(issueId).lean();
  if (!issue) throw new HttpError(404, 'Issue not found');

  const comments = await Comment.find({ issueId }).sort({ createdAt: 1 }).lean();

  let parsed = fallbackAnalysis;
  if (env.GEMINI_API_KEY) {
    const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: env.GEMINI_MODEL });
    const prompt = `
You are an expert issue triage assistant. Analyze this issue and discussion.
Return only valid JSON with these keys: summary, possibleRootCause, severityAssessment, suggestedFixes.

Issue:
${JSON.stringify({
  title: issue.title,
  description: issue.description,
  status: issue.status,
  priority: issue.priority,
  tags: issue.tags
})}

Comments:
${JSON.stringify(comments.map((comment) => ({ content: comment.content, createdAt: comment.createdAt })))}
`;

    try {
      const result = await withRetry(async () => model.generateContent(prompt));
      const text = result.response.text();
      parsed = analysisSchema.parse(extractJson(text));
    } catch (error) {
      console.error('Gemini analysis failed', error);
      throw new HttpError(
        502,
        `Gemini analysis failed. Check GEMINI_MODEL="${env.GEMINI_MODEL}" and verify that your API key can access that model.`,
      );
    }
  }

  const aiAnalysis = { ...parsed, generatedAt: new Date() };
  const updatedIssue = await Issue.findByIdAndUpdate(issueId, { aiAnalysis }, { new: true }).lean();
  return updatedIssue?.aiAnalysis;
};
