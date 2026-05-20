export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'IssueFlow API',
    version: '1.0.0',
    description: 'REST API for issue management, discussions, and Gemini issue analysis.'
  },
  servers: [{ url: 'http://localhost:5000/api' }],
  paths: {
    '/issues': {
      get: { summary: 'List issues', parameters: [], responses: { '200': { description: 'Issue list' } } },
      post: { summary: 'Create issue', responses: { '201': { description: 'Created issue' } } }
    },
    '/issues/{id}': {
      get: { summary: 'Get issue by id', responses: { '200': { description: 'Issue details' } } },
      patch: { summary: 'Update issue', responses: { '200': { description: 'Updated issue' } } },
      delete: { summary: 'Delete issue', responses: { '204': { description: 'Deleted' } } }
    },
    '/issues/{id}/comments': {
      get: { summary: 'List comments', responses: { '200': { description: 'Comments' } } },
      post: { summary: 'Add comment', responses: { '201': { description: 'Created comment' } } }
    },
    '/issues/{id}/analyze': {
      post: { summary: 'Generate Gemini AI analysis', responses: { '200': { description: 'AI analysis' } } }
    }
  }
};
