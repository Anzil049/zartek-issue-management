import { useNavigate } from 'react-router-dom';
import { IssueForm } from '../components/IssueForm';
import { useIssueMutations } from '../hooks/useIssues';
import { IssueInput } from '../types/issue';

export const NewIssuePage = () => {
  const navigate = useNavigate();
  const { createIssue } = useIssueMutations();

  const onSubmit = (input: IssueInput) => {
    createIssue.mutate(input, {
      onSuccess: (issue) => navigate(`/issues/${issue._id}`)
    });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">Create issue</h2>
        <p className="mt-1 text-sm text-muted-foreground">Capture the problem clearly so triage starts with useful context.</p>
      </div>
      <IssueForm isSubmitting={createIssue.isPending} onSubmit={onSubmit} />
    </div>
  );
};
