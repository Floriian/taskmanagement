import { TTeam } from './team.type';

export type TUser = {
  username: string;
  email: string;
  team: TTeam | null;
};
