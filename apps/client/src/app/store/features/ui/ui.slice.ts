import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { UiFeature } from './ui.feature.type';

const initialState: UiFeature = {
  lightMode: 'system',
  showDrawer: false,
  showNoTeamModal: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLightMode: (state, { payload }: PayloadAction<UiFeature>) => {
      state.lightMode = payload.lightMode;
    },
    toggleDrawer: (state) => {
      state.showDrawer = !state.showDrawer;
    },
    toggleNoTeamModal: (state) => {
      state.showNoTeamModal = !state.showNoTeamModal;
    },
  },
});

export const { setLightMode, toggleDrawer, toggleNoTeamModal } =
  uiSlice.actions;
