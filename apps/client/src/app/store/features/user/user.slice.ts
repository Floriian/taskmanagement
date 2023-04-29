import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../../../types';

const initialState: TUser = {
  email: '',
  username: '',
  inTeam: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<TUser>) => {
      state.email = payload.email;
      state.inTeam = payload.inTeam;
      state.username = payload.username;
    },
    toggleTeam: (state) => {
      state.inTeam = false;
    },
  },
});

export const { setUser, toggleTeam } = userSlice.actions;
