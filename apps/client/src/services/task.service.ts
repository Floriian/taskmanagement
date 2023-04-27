import { boolean } from 'zod';
import { TCreateTask, Task } from '../types';
import { authInstance } from './auth.instance';

export const taskService = {
  getTasks: async () => {
    const { data } = await authInstance.get<Task[]>('/task');
    return data;
  },
  getTask: async (id: string) => {
    const { data } = await authInstance.get<Task>(`/task/${id}`);
    return data;
  },
  createTask: async (data: TCreateTask) => {
    const { data: response } = await authInstance.post<Task>('/task', data);
    return response;
  },
  deleteTask: async (id: number) => {
    const res = await authInstance.delete<{ success: boolean }>(`/task/${id}`);
    return res;
  },
  updateTask: async (data: Task, id: number) => {
    const { data: response } = await authInstance.patch<Task>(`/task/${id}`);
    return response;
  },
  toggleTaskCompleted: async (id: number, completed: boolean) => {
    const { data } = await authInstance.patch<{ success: boolean }>(
      `/task/${id}`,
      {
        completed,
      },
    );
    return data;
  },
};
