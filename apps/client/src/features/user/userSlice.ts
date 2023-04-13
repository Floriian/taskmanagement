import { createSlice } from '@reduxjs/toolkit';
import type { UserFeature } from './user.feature.type';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../types';

const initialState: UserFeature = {
  email: '',
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<TUser, 'team'>>) => {
      (state.email = action.payload.email),
        (state.username = action.payload.username);
    },
  },
});

export const { setUser } = userSlice.actions;
