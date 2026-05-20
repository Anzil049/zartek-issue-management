import { FilterQuery } from 'mongoose';
import { Issue, IssueDocument } from '../models/Issue.js';
import { Comment } from '../models/Comment.js';
import { CreateIssueInput, UpdateIssueInput } from '../validators/issue.validator.js';
import { HttpError } from '../utils/http.js';

type ListFilters = {
  status?: string;
  priority?: string;
  search?: string;
};

export const listIssues = async (filters: ListFilters) => {
  const query: FilterQuery<IssueDocument> = {};
  if (filters.status) query.status = filters.status;
  if (filters.priority) query.priority = filters.priority;
  if (filters.search) query.title = { $regex: filters.search, $options: 'i' };
  return Issue.find(query).sort({ updatedAt: -1 }).lean();
};

export const createIssue = (input: CreateIssueInput) => Issue.create(input);

export const getIssueById = async (id: string) => {
  const issue = await Issue.findById(id).lean();
  if (!issue) throw new HttpError(404, 'Issue not found');
  return issue;
};

export const updateIssue = async (id: string, input: UpdateIssueInput) => {
  const issue = await Issue.findByIdAndUpdate(id, input, { new: true, runValidators: true }).lean();
  if (!issue) throw new HttpError(404, 'Issue not found');
  return issue;
};

export const deleteIssue = async (id: string) => {
  const issue = await Issue.findByIdAndDelete(id).lean();
  if (!issue) throw new HttpError(404, 'Issue not found');
  await Comment.deleteMany({ issueId: id });
  return issue;
};
