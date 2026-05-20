import { asyncHandler } from '../utils/asyncHandler.js';
import { createIssueSchema, listIssuesSchema, updateIssueSchema } from '../validators/issue.validator.js';
import * as issueService from '../services/issue.service.js';

export const getIssues = asyncHandler(async (req, res) => {
  const filters = listIssuesSchema.parse(req.query);
  const issues = await issueService.listIssues(filters);
  res.json({ data: issues });
});

export const postIssue = asyncHandler(async (req, res) => {
  const payload = createIssueSchema.parse(req.body);
  const issue = await issueService.createIssue(payload);
  res.status(201).json({ data: issue });
});

export const getIssue = asyncHandler(async (req, res) => {
  const issue = await issueService.getIssueById(req.params.id);
  res.json({ data: issue });
});

export const patchIssue = asyncHandler(async (req, res) => {
  const payload = updateIssueSchema.parse(req.body);
  const issue = await issueService.updateIssue(req.params.id, payload);
  res.json({ data: issue });
});

export const removeIssue = asyncHandler(async (req, res) => {
  await issueService.deleteIssue(req.params.id);
  res.status(204).send();
});
