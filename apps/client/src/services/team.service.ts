import { TCreateTeam, TTeam } from '../types';
import { authInstance } from './auth.instance';

export const teamService = {
  getUserTeam: async () => {
    const { data } = await authInstance<Omit<TTeam, 'users'>>('/api/team');
    return data;
  },
  createTeam: async (teamData: TCreateTeam) => {
    const { data } = await authInstance.post<Omit<TTeam, 'users'>>(
      '/api/team',
      teamData,
    );
    return data;
  },
  joinTeam: async (code: string) => {
    const { data } = await authInstance.post<{ success: boolean }>(
      `/api/team/join/${code}`,
    );
    return data;
  },
  findOneTeam: async (id: number) => {
    const { data } = await authInstance.get<Omit<TTeam, 'users'>>(
      `/api/team/${id}`,
    );
    return data;
  },
  getTeamMembers: async (id: number) => {
    const { data } = await authInstance.get<TTeam>(`/api/team/members/${id}`);
    return data;
  },
  leaveTeam: async () => {
    const { data } = await authInstance.delete<{ success: boolean }>(
      '/api/team/leave',
    );
    return data;
  },
};
