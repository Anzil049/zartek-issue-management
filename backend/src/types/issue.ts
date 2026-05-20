export const issueStatuses = ['OPEN', 'IN_PROGRESS', 'CLOSED'] as const;
export const issuePriorities = ['LOW', 'MEDIUM', 'HIGH'] as const;

export type IssueStatus = (typeof issueStatuses)[number];
export type IssuePriority = (typeof issuePriorities)[number];

export type AiAnalysis = {
  summary: string;
  possibleRootCause: string;
  severityAssessment: string;
  suggestedFixes: string[];
  generatedAt: Date;
};
