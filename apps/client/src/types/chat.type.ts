import { z } from 'zod';
import { TUser } from './user.type';

export const ChatSchema = z.object({
  message: z.string(),
});

export type TChat = z.infer<typeof ChatSchema>;
export type TChatUser = TChat & {
  id: number;
  user: Omit<TUser, 'inTeam'>;
};
