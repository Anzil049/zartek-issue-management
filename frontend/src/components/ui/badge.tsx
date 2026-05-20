import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export const Badge = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium', className)}>{children}</span>
);
