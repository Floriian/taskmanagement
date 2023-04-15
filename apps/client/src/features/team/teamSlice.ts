import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TeamFeature } from './team.feature.type';

const initialState: TeamFeature = {
  teamInviteCode: '',
  teamName: '',
  id: undefined,
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
  },
});

export const { setTeam } = teamSlice.actions;
