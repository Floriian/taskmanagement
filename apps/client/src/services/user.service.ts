import { TUser } from '../types';
import { authInstance } from './auth.instance';

export const userService = {
  getUser: async () => {
    const { data } = await authInstance<TUser>('/user');
    return data;
  },

  findUser: async (username: string) => {
    const { data } = await authInstance<TUser>(`/user/${username}`);
    return data;
  },
};
