import { SelectHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export const Select = ({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select className={cn('h-10 rounded-md border bg-card px-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/30', className)} {...props} />
);
