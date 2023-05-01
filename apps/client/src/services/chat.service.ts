import { TChatUser } from '../types';
import { authInstance } from './auth.instance';

export const chatService = {
  getChatMessages: async () => {
    const { data } = await authInstance<TChatUser[]>('/chat');
    return data;
  },
};
