import { generateIssueAnalysis } from '../ai/gemini.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const analyzeIssue = asyncHandler(async (req, res) => {
  const analysis = await generateIssueAnalysis(req.params.id);
  res.json({ data: analysis });
});
