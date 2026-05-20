import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input className={cn('h-10 w-full rounded-md border bg-card px-3 text-sm outline-none transition focus:ring-2 focus:ring-primary/30', className)} {...props} />
);

export const Textarea = ({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea className={cn('min-h-32 w-full rounded-md border bg-card px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-primary/30', className)} {...props} />
);
