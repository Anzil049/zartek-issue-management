import mongoose, { InferSchemaType } from 'mongoose';
import { issuePriorities, issueStatuses } from '../types/issue.js';

const aiAnalysisSchema = new mongoose.Schema(
  {
    summary: { type: String, required: true },
    possibleRootCause: { type: String, required: true },
    severityAssessment: { type: String, required: true },
    suggestedFixes: [{ type: String, required: true }],
    generatedAt: { type: Date, default: Date.now }
  },
  { _id: false },
);

const issueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    status: { type: String, enum: issueStatuses, default: 'OPEN', index: true },
    priority: { type: String, enum: issuePriorities, default: 'MEDIUM', index: true },
    tags: [{ type: String, trim: true, lowercase: true }],
    aiAnalysis: { type: aiAnalysisSchema, default: null }
  },
  { timestamps: true },
);

issueSchema.index({ title: 'text', description: 'text', tags: 'text' });

export type IssueDocument = InferSchemaType<typeof issueSchema> & { _id: mongoose.Types.ObjectId };
export const Issue = mongoose.model('Issue', issueSchema);
