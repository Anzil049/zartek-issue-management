import { apiClient } from '../api/client';
import { AiAnalysis, Comment, Issue, IssueInput, IssuePriority, IssueStatus } from '../types/issue';

type ApiResponse<T> = { data: T };

export type IssueFilters = {
  status?: IssueStatus | 'ALL';
  priority?: IssuePriority | 'ALL';
  search?: string;
};

export const issueService = {
  async list(filters: IssueFilters) {
    const params = {
      status: filters.status === 'ALL' ? undefined : filters.status,
      priority: filters.priority === 'ALL' ? undefined : filters.priority,
      search: filters.search || undefined
    };
    const { data } = await apiClient.get<ApiResponse<Issue[]>>('/issues', { params });
    return data.data;
  },
  async get(id: string) {
    const { data } = await apiClient.get<ApiResponse<Issue>>(`/issues/${id}`);
    return data.data;
  },
  async create(input: IssueInput) {
    const { data } = await apiClient.post<ApiResponse<Issue>>('/issues', input);
    return data.data;
  },
  async update(id: string, input: Partial<IssueInput>) {
    const { data } = await apiClient.patch<ApiResponse<Issue>>(`/issues/${id}`, input);
    return data.data;
  },
  async remove(id: string) {
    await apiClient.delete(`/issues/${id}`);
  },
  async comments(id: string) {
    const { data } = await apiClient.get<ApiResponse<Comment[]>>(`/issues/${id}/comments`);
    return data.data;
  },
  async addComment(id: string, content: string) {
    const { data } = await apiClient.post<ApiResponse<Comment>>(`/issues/${id}/comments`, { content });
    return data.data;
  },
  async analyze(id: string) {
    const { data } = await apiClient.post<ApiResponse<AiAnalysis>>(`/issues/${id}/analyze`);
    return data.data;
  }
};
