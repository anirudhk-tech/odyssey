import { createSlice } from "@reduxjs/toolkit";

export interface ScenesDrawerState {
  isDrawerOpen: boolean;
  scenesDrawerWidth: number;
}

const initialState: ScenesDrawerState = {
  isDrawerOpen: false,
  scenesDrawerWidth: 300,
};

export const scenesDrawerSlice = createSlice({
  name: "scenesDrawer",
  initialState,
  reducers: {
    toggleScenesDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    openScenesDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    closeScenesDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    setScenesDrawerWidth: (state, action) => {
      if (!state.isDrawerOpen) return;
      if (action.payload > 1000) return;
      if (action.payload < 300) {
        state.isDrawerOpen = false;
        state.scenesDrawerWidth = 300;
        return;
      }
      state.scenesDrawerWidth = action.payload;
    },
  },
});

export const {
  toggleScenesDrawer,
  openScenesDrawer,
  closeScenesDrawer,
  setScenesDrawerWidth,
} = scenesDrawerSlice.actions;
export default scenesDrawerSlice.reducer;
