import { Badge } from './ui/badge';
import { IssuePriority, IssueStatus } from '../types/issue';

export const StatusBadge = ({ status }: { status: IssueStatus }) => {
  const style = {
    OPEN: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200',
    IN_PROGRESS: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200',
    CLOSED: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
  }[status];
  return <Badge className={style}>{status.replace('_', ' ')}</Badge>;
};

export const PriorityBadge = ({ priority }: { priority: IssuePriority }) => {
  const style = {
    LOW: 'border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300',
    MEDIUM: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-200',
    HIGH: 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200'
  }[priority];
  return <Badge className={style}>{priority}</Badge>;
};
