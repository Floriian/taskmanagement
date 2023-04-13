import { createSlice } from '@reduxjs/toolkit';
import type { AuthFeature } from './auth.feature.type';
import type { TUser } from '../../types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthFeature = {
  error: null,
  loading: false,
  userInfo: undefined,
  userToken: '',
  success: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.userInfo = action.payload;
      console.log(state);
      console.log(action.payload);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload;
    },
  },
});

export const { setUser, setToken } = authSlice.actions;
