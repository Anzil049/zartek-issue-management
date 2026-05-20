import { Calendar, Tags } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Issue } from '../types/issue';
import { PriorityBadge, StatusBadge } from './StatusBadge';
import { Card } from './ui/card';

export const IssueCard = ({ issue }: { issue: Issue }) => (
  <Link to={`/issues/${issue._id}`}>
    <Card className="p-4 transition hover:-translate-y-0.5 hover:border-primary/40">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold">{issue.title}</h2>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{issue.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(issue.updatedAt).toLocaleDateString()}
            </span>
            {issue.tags.length > 0 && (
              <span className="inline-flex items-center gap-1">
                <Tags className="h-3.5 w-3.5" />
                {issue.tags.join(', ')}
              </span>
            )}
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <StatusBadge status={issue.status} />
          <PriorityBadge priority={issue.priority} />
        </div>
      </div>
    </Card>
  </Link>
);
