import { Bot, Loader2, Pencil, Send, Trash2 } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { IssueForm } from '../components/IssueForm';
import { Skeleton } from '../components/Skeleton';
import { PriorityBadge, StatusBadge } from '../components/StatusBadge';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Textarea } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { useComments, useIssue, useIssueMutations } from '../hooks/useIssues';
import { IssueInput, IssueStatus } from '../types/issue';

export const IssueDetailPage = () => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [editing, setEditing] = useState(false);
  const { data: issue, isLoading, isError, error } = useIssue(id);
  const { data: comments = [], isLoading: commentsLoading } = useComments(id);
  const { updateIssue, deleteIssue, addComment, analyzeIssue } = useIssueMutations();

  const submitComment = (event: FormEvent) => {
    event.preventDefault();
    if (!comment.trim()) return;
    addComment.mutate({ id, content: comment }, { onSuccess: () => setComment('') });
  };

  const submitEdit = (input: IssueInput) => {
    updateIssue.mutate({ id, input }, { onSuccess: () => setEditing(false) });
  };

  if (isLoading) return <div className="space-y-4"><Skeleton className="h-48" /><Skeleton className="h-72" /></div>;
  if (isError || !issue) return <EmptyState title="Issue unavailable" message={error?.message ?? 'The issue could not be found.'} />;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <Link to="/issues" className="text-sm text-muted-foreground hover:text-foreground">Back to issues</Link>
            <h2 className="mt-2 text-2xl font-semibold">{issue.title}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusBadge status={issue.status} />
              <PriorityBadge priority={issue.priority} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setEditing((value) => !value)}><Pencil className="h-4 w-4" />Edit</Button>
            <Button variant="danger" onClick={() => deleteIssue.mutate(id, { onSuccess: () => navigate('/issues') })}><Trash2 className="h-4 w-4" />Delete</Button>
          </div>
        </div>

        {editing ? (
          <IssueForm issue={issue} isSubmitting={updateIssue.isPending} onSubmit={submitEdit} />
        ) : (
          <Card className="p-5">
            <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">{issue.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {issue.tags.map((tag) => <span key={tag} className="rounded-md bg-muted px-2 py-1 text-xs">{tag}</span>)}
            </div>
            <div className="mt-5 max-w-xs">
              <label className="mb-2 block text-sm font-medium">Status</label>
              <Select value={issue.status} onChange={(event) => updateIssue.mutate({ id, input: { status: event.target.value as IssueStatus } })}>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In progress</option>
                <option value="CLOSED">Closed</option>
              </Select>
            </div>
          </Card>
        )}

        <Card className="p-5">
          <h3 className="text-lg font-semibold">Discussion</h3>
          <form className="mt-4 space-y-3" onSubmit={submitComment}>
            <Textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Add an update, finding, or reproduction note" />
            <Button disabled={addComment.isPending} type="submit">
              {addComment.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Add comment
            </Button>
          </form>
          <div className="mt-6 space-y-3">
            {commentsLoading && <Skeleton className="h-20" />}
            {comments.map((item) => (
              <div key={item._id} className="rounded-md border bg-background p-3">
                <p className="text-sm">{item.content}</p>
                <p className="mt-2 text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
            ))}
            {!commentsLoading && comments.length === 0 && <p className="text-sm text-muted-foreground">No comments yet.</p>}
          </div>
        </Card>
      </section>

      <aside className="space-y-4">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold">AI analysis</h3>
            <Button size="sm" onClick={() => analyzeIssue.mutate(id)} disabled={analyzeIssue.isPending}>
              {analyzeIssue.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Bot className="h-4 w-4" />}
              Generate
            </Button>
          </div>
          {issue.aiAnalysis ? (
            <div className="mt-4 space-y-4 text-sm">
              <section><p className="font-medium">Summary</p><p className="mt-1 text-muted-foreground">{issue.aiAnalysis.summary}</p></section>
              <section><p className="font-medium">Possible root cause</p><p className="mt-1 text-muted-foreground">{issue.aiAnalysis.possibleRootCause}</p></section>
              <section><p className="font-medium">Severity</p><p className="mt-1 text-muted-foreground">{issue.aiAnalysis.severityAssessment}</p></section>
              <section>
                <p className="font-medium">Suggested fixes</p>
                <ul className="mt-2 space-y-2 text-muted-foreground">
                  {issue.aiAnalysis.suggestedFixes.map((fix) => <li key={fix} className="rounded-md bg-muted p-2">{fix}</li>)}
                </ul>
              </section>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">Generate an analysis after adding enough issue context and comments.</p>
          )}
        </Card>
      </aside>
    </div>
  );
};
