import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './features/auth/authSlice';
import { userSlice } from './features/user/userSlice';
import { teamSlice } from './features/team/teamSlice';
import { uiSlice } from './features/ui/ui.slice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
    team: teamSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
