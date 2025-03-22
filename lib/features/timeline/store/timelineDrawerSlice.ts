import { createSlice } from "@reduxjs/toolkit";

export interface TimelineState {
  isDrawerOpen: boolean;
  timelineDrawerHeight: number;
}

const initialState: TimelineState = {
  isDrawerOpen: false,
  timelineDrawerHeight: 200,
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
      if (action.payload > 400) return;

      if (action.payload < 200) {
        state.isDrawerOpen = false;
        state.timelineDrawerHeight = 200;
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
