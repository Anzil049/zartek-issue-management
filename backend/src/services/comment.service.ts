import { Comment } from '../models/Comment.js';
import { Issue } from '../models/Issue.js';
import { HttpError } from '../utils/http.js';

export const listComments = async (issueId: string) => {
  const issueExists = await Issue.exists({ _id: issueId });
  if (!issueExists) throw new HttpError(404, 'Issue not found');
  return Comment.find({ issueId }).sort({ createdAt: 1 }).lean();
};

export const createComment = async (issueId: string, content: string) => {
  const issueExists = await Issue.exists({ _id: issueId });
  if (!issueExists) throw new HttpError(404, 'Issue not found');
  return Comment.create({ issueId, content });
};
