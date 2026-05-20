import { Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { IssueCard } from '../components/IssueCard';
import { Skeleton } from '../components/Skeleton';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { useIssues } from '../hooks/useIssues';
import { IssuePriority, IssueStatus } from '../types/issue';

export const IssuesPage = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<IssueStatus | 'ALL'>('ALL');
  const [priority, setPriority] = useState<IssuePriority | 'ALL'>('ALL');
  const filters = useMemo(() => ({ search, status, priority }), [search, status, priority]);
  const { data: issues = [], isLoading, isError, error } = useIssues(filters);

  const counts = {
    open: issues.filter((issue) => issue.status === 'OPEN').length,
    progress: issues.filter((issue) => issue.status === 'IN_PROGRESS').length,
    closed: issues.filter((issue) => issue.status === 'CLOSED').length
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-3 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4"><p className="text-sm text-muted-foreground">Open</p><p className="mt-2 text-2xl font-semibold">{counts.open}</p></div>
        <div className="rounded-lg border bg-card p-4"><p className="text-sm text-muted-foreground">In progress</p><p className="mt-2 text-2xl font-semibold">{counts.progress}</p></div>
        <div className="rounded-lg border bg-card p-4"><p className="text-sm text-muted-foreground">Closed</p><p className="mt-2 text-2xl font-semibold">{counts.closed}</p></div>
      </section>
      <section className="flex flex-col gap-3 rounded-lg border bg-card p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search by title" value={search} onChange={(event) => setSearch(event.target.value)} />
        </div>
        <Select value={status} onChange={(event) => setStatus(event.target.value as IssueStatus | 'ALL')}>
          <option value="ALL">All statuses</option>
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="CLOSED">Closed</option>
        </Select>
        <Select value={priority} onChange={(event) => setPriority(event.target.value as IssuePriority | 'ALL')}>
          <option value="ALL">All priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </Select>
        <Link to="/issues/new" className="md:w-auto">
          <Button className="w-full md:w-auto"><Plus className="h-4 w-4" />New issue</Button>
        </Link>
      </section>

      {isLoading && <div className="space-y-3">{Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-32" />)}</div>}
      {isError && <EmptyState title="Could not load issues" message={error.message} />}
      {!isLoading && !isError && issues.length === 0 && <EmptyState title="No issues found" message="Create a new issue or adjust the current filters." />}
      <div className="space-y-3">{issues.map((issue) => <IssueCard key={issue._id} issue={issue} />)}</div>
    </div>
  );
};
