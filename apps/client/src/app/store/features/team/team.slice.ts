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
    removeTeam: (state) => {
      state = initialState;
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
          createdBy: payload.createdBy,
        });
      }
    },
    removeTask: (state, { payload }: PayloadAction<{ id: number }>) => {
      state.tasks = state.tasks.filter((t) => t.id != payload.id);
    },
    toggleCompleted: (state, { payload }: PayloadAction<{ id: number }>) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task && task.id === payload.id,
      );
      state.tasks[taskIndex].completed = !state.tasks[taskIndex].completed;
    },
  },
});

export const {
  setTeam,
  addTask,
  addTeamMember,
  toggleCompleted,
  removeTask,
  removeTeam,
} = teamSlice.actions;
