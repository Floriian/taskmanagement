import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TeamFeature } from './team.feature.type';
import { Task, TUser } from '../../types';

const initialState: TeamFeature = {
  teamInviteCode: '',
  teamName: '',
  id: undefined,
  tasks: [],
  users: [],
};

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeam: (state, action: PayloadAction<TeamFeature>) => {
      (state.id = action.payload.id),
        (state.teamInviteCode = action.payload.teamInviteCode),
        (state.teamName = action.payload.teamName);
    },
    addTask: (state, action: PayloadAction<Task>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);

      if (!task) {
        state.tasks.push({
          id: action.payload.id,
          taskTitle: action.payload.taskTitle,
          completed: action.payload.completed,
          createdAt: action.payload.createdAt,
          deadline: action.payload.deadline,
          description: action.payload.description,
          updatedAt: action.payload.updatedAt,
        });
      }
    },
    addTeamMember: (state, action: PayloadAction<Omit<TUser, 'inTeam'>>) => {
      const user = state.users.find((u) => u.email === action.payload.email);
      if (!user) {
        state.users.push({
          email: action.payload.email,
          username: action.payload.username,
          inTeam: true,
        });
      }
    },
  },
});

export const { setTeam, addTask, addTeamMember } = teamSlice.actions;
