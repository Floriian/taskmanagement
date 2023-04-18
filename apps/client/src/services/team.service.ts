import { TCreateTeam, TTeam, TUser } from '../types';
import { authInstance } from './auth.instance';

export const teamService = {
  getUserTeam: async () => {
    const { data } = await authInstance<Omit<TTeam, 'users'>>('/team');
    return data;
  },
  createTeam: async (teamData: TCreateTeam) => {
    const { data } = await authInstance.post<Omit<TTeam, 'users'>>(
      '/team',
      teamData,
    );
    return data;
  },
  joinTeam: async (code: string) => {
    const { data } = await authInstance.post<{ success: boolean }>(
      `/team/join/${code}`,
    );
    return data;
  },
  findOneTeam: async (id: number) => {
    const { data } = await authInstance.get<Omit<TTeam, 'users'>>(
      `/team/${id}`,
    );
    return data;
  },
  getTeamMembers: async (id: number) => {
    const { data } = await authInstance.get<TUser[]>(`/team/members/${id}`);
    return data;
  },
  leaveTeam: async () => {
    const { data } = await authInstance.delete<{ success: boolean }>(
      '/team/leave',
    );
    return data;
  },
};
