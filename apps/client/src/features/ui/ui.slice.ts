import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UiFeature } from './ui.feature.type';

const initialState: UiFeature = {
  lightMode: 'system',
  showDrawer: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLightMode: (state, action: PayloadAction<UiFeature>) => {
      state.lightMode = action.payload.lightMode;
    },
    toggleDrawer: (state) => {
      state.showDrawer = !state.showDrawer;
    },
  },
});

export const { setLightMode, toggleDrawer } = uiSlice.actions;
