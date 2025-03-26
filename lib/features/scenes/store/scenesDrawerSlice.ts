import { createSlice } from "@reduxjs/toolkit";

export interface ScenesDrawerState {
  isDrawerOpen: boolean;
  scenesDrawerWidth: number;
}

const initialWidth =
  typeof window !== "undefined" ? window.innerWidth / 4 : 300;
const maxWidth = typeof window !== "undefined" ? window.innerWidth / 2 : 1000;

const initialState: ScenesDrawerState = {
  isDrawerOpen: false,
  scenesDrawerWidth: initialWidth,
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
      if (action.payload > maxWidth) return;
      if (action.payload < initialWidth) {
        state.isDrawerOpen = false;
        state.scenesDrawerWidth = initialWidth;
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
