import { z } from 'zod';
import { issuePriorities, issueStatuses } from '../types/issue.js';

export const listIssuesSchema = z.object({
  status: z.enum(issueStatuses).optional(),
  priority: z.enum(issuePriorities).optional(),
  search: z.string().trim().optional()
});

export const createIssueSchema = z.object({
  title: z.string().trim().min(3).max(160),
  description: z.string().trim().min(5).max(5000),
  status: z.enum(issueStatuses).default('OPEN'),
  priority: z.enum(issuePriorities).default('MEDIUM'),
  tags: z.array(z.string().trim().min(1).max(30)).max(8).default([])
});

export const updateIssueSchema = createIssueSchema.partial();

export const commentSchema = z.object({
  content: z.string().trim().min(1).max(2000)
});

export type CreateIssueInput = z.infer<typeof createIssueSchema>;
export type UpdateIssueInput = z.infer<typeof updateIssueSchema>;
