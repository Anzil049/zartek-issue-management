import { Inbox } from 'lucide-react';

export const EmptyState = ({ title, message }: { title: string; message: string }) => (
  <div className="flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed bg-card p-8 text-center">
    <Inbox className="mb-3 h-9 w-9 text-muted-foreground" />
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="mt-1 max-w-md text-sm text-muted-foreground">{message}</p>
  </div>
);
