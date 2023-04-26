import { z } from 'zod';
import dayjs, { Dayjs } from 'dayjs';

export const CreateTaskSchema = z.object({
  taskTitle: z.string().min(1),
  description: z.string().min(1),
  deadline: z.custom<Dayjs>((data) => {
    if (data instanceof dayjs) {
      return data;
    } else {
      const date = dayjs();
      return date;
    }
  }),
});
export type TCreateTask = z.infer<typeof CreateTaskSchema>;
export type Task = TCreateTask & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  completed: boolean;
  createdBy: string;
};
