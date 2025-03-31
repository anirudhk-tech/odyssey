import { Timeline } from "@/app/types/timeline";
import { createSlice } from "@reduxjs/toolkit";

export interface TimelineSlice {
  timelines: Timeline[];
  timelineBeingAdded: boolean;
}

const initialState: TimelineSlice = {
  timelines: [],
  timelineBeingAdded: false,
};

export const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    toggleTimelineBeingAdded: (state) => {
      state.timelineBeingAdded = !state.timelineBeingAdded;
    },
    addTimeline: (state, action) => {
      state.timelines.push(action.payload);
    },
    setTimelines: (state, action) => {
      state.timelines = action.payload;
    },
  },
});

export const { toggleTimelineBeingAdded, addTimeline, setTimelines } =
  timelineSlice.actions;
export default timelineSlice.reducer;
