import { TUser } from './user.type';
import { z } from 'zod';

export const CreateTeamSchema = z.object({
  teamName: z.string().min(1),
});
export type TCreateTeam = z.infer<typeof CreateTeamSchema>;

export type TTeam = {
  id?: number;
  teamName: string;
  teamInviteCode: string;
  users: TUser[];
};
