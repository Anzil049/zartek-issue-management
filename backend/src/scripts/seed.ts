import { connectDB } from '../config/db.js';
import { Comment } from '../models/Comment.js';
import { Issue } from '../models/Issue.js';

await connectDB();

await Promise.all([Issue.deleteMany({}), Comment.deleteMany({})]);

const issues = await Issue.insertMany([
  {
    title: 'Login page returns 500 after password reset',
    description: 'Users who reset their password cannot sign in. The API returns an internal error after submitting the new credentials.',
    status: 'OPEN',
    priority: 'HIGH',
    tags: ['auth', 'backend']
  },
  {
    title: 'Kanban status dropdown is slow on mobile',
    description: 'Changing issue status takes several seconds on small devices and sometimes the UI does not refresh until reload.',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    tags: ['frontend', 'mobile']
  },
  {
    title: 'CSV export omits closed issues',
    description: 'The reporting export only includes open and in-progress issues even when closed issues are selected in filters.',
    status: 'CLOSED',
    priority: 'LOW',
    tags: ['reports']
  }
]);

await Comment.insertMany([
  { issueId: issues[0]._id, content: 'Reproduced in staging with two different test accounts.' },
  { issueId: issues[0]._id, content: 'Looks related to stale reset tokens after rotation.' },
  { issueId: issues[1]._id, content: 'React Query mutation succeeds but list invalidation appears delayed.' },
  { issueId: issues[2]._id, content: 'Fixed by including CLOSED in the export aggregation match stage.' }
]);

console.log('Seed data inserted');
process.exit(0);
