import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Issue, IssueInput } from '../types/issue';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input, Textarea } from './ui/input';
import { Select } from './ui/select';

const schema = z.object({
  title: z.string().min(3, 'Use at least 3 characters'),
  description: z.string().min(5, 'Use at least 5 characters'),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  tags: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

export const IssueForm = ({
  issue,
  isSubmitting,
  onSubmit
}: {
  issue?: Issue;
  isSubmitting: boolean;
  onSubmit: (input: IssueInput) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: issue?.title ?? '',
      description: issue?.description ?? '',
      status: issue?.status ?? 'OPEN',
      priority: issue?.priority ?? 'MEDIUM',
      tags: issue?.tags.join(', ') ?? ''
    }
  });

  const submit = (values: FormValues) =>
    onSubmit({
      ...values,
      tags: values.tags ? values.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : []
    });

  return (
    <Card className="p-5">
      <form className="space-y-5" onSubmit={handleSubmit(submit)}>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Title</span>
          <Input {...register('title')} placeholder="Short issue title" />
          {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
        </label>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Description</span>
          <Textarea {...register('description')} placeholder="Describe the problem, impact, and context" />
          {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
        </label>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block space-y-2">
            <span className="text-sm font-medium">Status</span>
            <Select {...register('status')}>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In progress</option>
              <option value="CLOSED">Closed</option>
            </Select>
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium">Priority</span>
            <Select {...register('priority')}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </Select>
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-medium">Tags</span>
            <Input {...register('tags')} placeholder="api, frontend" />
          </label>
        </div>
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {issue ? 'Save changes' : 'Create issue'}
        </Button>
      </form>
    </Card>
  );
};
