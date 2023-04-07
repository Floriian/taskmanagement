import { TUser } from './user.type';

export type TTeam = {
  teamName: string;
  teamInviteCode: string;
  users: TUser[];
};
