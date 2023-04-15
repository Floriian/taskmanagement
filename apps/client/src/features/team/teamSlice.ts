import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TeamFeature } from './team.feature.type';
import { unknown } from 'zod';

const initialState: TeamFeature = {
  teamInviteCode: '',
  teamName: '',
  id: undefined,
  tasks: [],
};

const date = new Date();

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeam: (state, action: PayloadAction<TeamFeature>) => {
      (state.id = action.payload.id),
        (state.teamInviteCode = action.payload.teamInviteCode),
        (state.teamName = action.payload.teamName);
    },
    addTask: (state) => {
      state.tasks.push({
        completed: true,
        description: 'description',
        id: 1,
        taskTitle: 'task title',
        createdAt: date,
        deadline: date,
        updatedAt: date,
      });
    },
  },
});

export const { setTeam, addTask } = teamSlice.actions;
