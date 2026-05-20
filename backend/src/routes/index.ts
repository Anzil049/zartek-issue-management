import { Router } from 'express';
import { issueRouter } from './issue.routes.js';

export const apiRouter = Router();

apiRouter.get('/health', (_req, res) => res.json({ status: 'ok' }));
apiRouter.use('/issues', issueRouter);
