import { z } from 'zod';
export const CreateTaskSchema = z.object({
  taskTitle: z.string().min(1),
  description: z.string().min(10),
  deadline: z.date(),
});
export type TCreateTask = z.infer<typeof CreateTaskSchema>;
export type Task = TCreateTask & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
  createdBy: string;
};
