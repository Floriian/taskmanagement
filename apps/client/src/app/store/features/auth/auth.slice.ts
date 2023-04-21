import { createSlice } from '@reduxjs/toolkit';
import type { AuthFeature } from './auth.feature.type';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthFeature = {
  userToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.userToken = payload;
    },
  },
});

export const { setToken } = authSlice.actions;
