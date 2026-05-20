export type IssueStatus = 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
export type IssuePriority = 'LOW' | 'MEDIUM' | 'HIGH';

export type AiAnalysis = {
  summary: string;
  possibleRootCause: string;
  severityAssessment: string;
  suggestedFixes: string[];
  generatedAt: string;
};

export type Issue = {
  _id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  tags: string[];
  aiAnalysis?: AiAnalysis | null;
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  _id: string;
  issueId: string;
  content: string;
  createdAt: string;
};

export type IssueInput = {
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  tags: string[];
};
