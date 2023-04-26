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
};
