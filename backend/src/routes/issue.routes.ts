import { Router } from 'express';
import { analyzeIssue } from '../controllers/ai.controller.js';
import { getComments, postComment } from '../controllers/comment.controller.js';
import { getIssue, getIssues, patchIssue, postIssue, removeIssue } from '../controllers/issue.controller.js';

export const issueRouter = Router();

issueRouter.route('/').get(getIssues).post(postIssue);
issueRouter.route('/:id').get(getIssue).patch(patchIssue).delete(removeIssue);
issueRouter.route('/:id/comments').get(getComments).post(postComment);
issueRouter.post('/:id/analyze', analyzeIssue);
