import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { UiFeature } from './ui.feature.type';

const initialState: UiFeature = {
  lightMode: true,
  showDrawer: false,
  showNoTeamModal: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleLightMode: (state) => {
      state.lightMode = !state.lightMode;
    },
    toggleDrawer: (state) => {
      state.showDrawer = !state.showDrawer;
    },
    toggleNoTeamModal: (state) => {
      state.showNoTeamModal = !state.showNoTeamModal;
    },
  },
});

export const { toggleLightMode, toggleDrawer, toggleNoTeamModal } =
  uiSlice.actions;
