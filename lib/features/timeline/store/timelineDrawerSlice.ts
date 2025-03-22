import { createSlice } from "@reduxjs/toolkit";

export interface TimelineState {
  isDrawerOpen: boolean;
  timelineDrawerHeight: number;
}

const initialHeight =
  typeof window !== "undefined" ? window.innerHeight / 3 : 200;
const maxHeight =
  typeof window !== "undefined" ? window.innerHeight - 300 : 400;

const initialState: TimelineState = {
  isDrawerOpen: false,
  timelineDrawerHeight: initialHeight,
};

export const timelineDrawerSlice = createSlice({
  name: "timelineDrawer",
  initialState,
  reducers: {
    toggleTimelineDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
    openTimelineDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    closeTimelineDrawer: (state) => {
      state.isDrawerOpen = false;
    },
    setTimelineDrawerHeight: (state, action) => {
      if (!state.isDrawerOpen) return;
      if (action.payload > maxHeight) return;

      if (action.payload < initialHeight) {
        state.isDrawerOpen = false;
        state.timelineDrawerHeight = initialHeight;
        return;
      }
      state.timelineDrawerHeight = action.payload;
    },
  },
});

export const {
  toggleTimelineDrawer,
  openTimelineDrawer,
  closeTimelineDrawer,
  setTimelineDrawerHeight,
} = timelineDrawerSlice.actions;
export default timelineDrawerSlice.reducer;
