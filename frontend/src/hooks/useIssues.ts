import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { issueService, IssueFilters } from '../services/issues.service';
import { IssueInput } from '../types/issue';

export const issueKeys = {
  all: ['issues'] as const,
  list: (filters: IssueFilters) => [...issueKeys.all, filters] as const,
  detail: (id: string) => [...issueKeys.all, id] as const,
  comments: (id: string) => [...issueKeys.detail(id), 'comments'] as const
};

export const useIssues = (filters: IssueFilters) =>
  useQuery({
    queryKey: issueKeys.list(filters),
    queryFn: () => issueService.list(filters)
  });

export const useIssue = (id: string) =>
  useQuery({
    queryKey: issueKeys.detail(id),
    queryFn: () => issueService.get(id),
    enabled: Boolean(id)
  });

export const useComments = (id: string) =>
  useQuery({
    queryKey: issueKeys.comments(id),
    queryFn: () => issueService.comments(id),
    enabled: Boolean(id)
  });

export const useIssueMutations = () => {
  const queryClient = useQueryClient();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: issueKeys.all });

  return {
    createIssue: useMutation({
      mutationFn: (input: IssueInput) => issueService.create(input),
      onSuccess: () => {
        toast.success('Issue created');
        invalidate();
      },
      onError: (error) => toast.error(error.message)
    }),
    updateIssue: useMutation({
      mutationFn: ({ id, input }: { id: string; input: Partial<IssueInput> }) => issueService.update(id, input),
      onSuccess: (issue) => {
        toast.success('Issue updated');
        queryClient.setQueryData(issueKeys.detail(issue._id), issue);
        invalidate();
      },
      onError: (error) => toast.error(error.message)
    }),
    deleteIssue: useMutation({
      mutationFn: (id: string) => issueService.remove(id),
      onSuccess: () => {
        toast.success('Issue deleted');
        invalidate();
      },
      onError: (error) => toast.error(error.message)
    }),
    addComment: useMutation({
      mutationFn: ({ id, content }: { id: string; content: string }) => issueService.addComment(id, content),
      onSuccess: (_comment, variables) => {
        toast.success('Comment added');
        queryClient.invalidateQueries({ queryKey: issueKeys.comments(variables.id) });
      },
      onError: (error) => toast.error(error.message)
    }),
    analyzeIssue: useMutation({
      mutationFn: (id: string) => issueService.analyze(id),
      onSuccess: (_analysis, id) => {
        toast.success('AI analysis generated');
        queryClient.invalidateQueries({ queryKey: issueKeys.detail(id) });
      },
      onError: (error) => toast.error(error.message)
    })
  };
};
