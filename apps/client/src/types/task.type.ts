import { z } from 'zod';
import dayjs, { type Dayjs } from 'dayjs';

export const CreateTaskSchema = z.object({
  taskTitle: z.string().min(1),
  description: z.string().min(10),
  deadline: z.instanceof(dayjs as unknown as typeof Dayjs),
});
export type TCreateTask = z.infer<typeof CreateTaskSchema>;
export type Task = TCreateTask & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
  createdBy: string;
};
