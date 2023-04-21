import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TTeam, TUser, Task } from '../../../../types';

const initialState: TTeam = {
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
    setTeam: (state, { payload }: PayloadAction<TTeam>) => {
      state.id = payload.id;
      state.tasks = payload.tasks;
      state.teamInviteCode = payload.teamInviteCode;
      state.teamName = payload.teamName;
      state.users = state.users;
    },
    addTask: (state, { payload }: PayloadAction<Task>) => {
      const task = state.tasks.find((t) => t.id === payload.id);

      if (!task) {
        state.tasks.push({
          id: payload.id,
          taskTitle: payload.taskTitle,
          completed: payload.completed,
          createdAt: payload.createdAt,
          deadline: payload.deadline,
          description: payload.description,
          updatedAt: payload.updatedAt,
        });
      }
    },
    addTeamMember: (
      state,
      { payload }: PayloadAction<Omit<TUser, 'inTeam'>>,
    ) => {
      const user = state.users.find((u) => u.email === payload.email);
      if (!user) {
        state.users.push({
          email: payload.email,
          username: payload.username,
          inTeam: true,
        });
      }
    },
  },
});

export const { setTeam, addTask, addTeamMember } = teamSlice.actions;
