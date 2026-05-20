import { asyncHandler } from '../utils/asyncHandler.js';
import { commentSchema } from '../validators/issue.validator.js';
import * as commentService from '../services/comment.service.js';

export const getComments = asyncHandler(async (req, res) => {
  const comments = await commentService.listComments(req.params.id);
  res.json({ data: comments });
});

export const postComment = asyncHandler(async (req, res) => {
  const payload = commentSchema.parse(req.body);
  const comment = await commentService.createComment(req.params.id, payload.content);
  res.status(201).json({ data: comment });
});
