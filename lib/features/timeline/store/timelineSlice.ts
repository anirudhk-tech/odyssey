import { Timeline } from "@/app/types/timeline";
import { createSlice } from "@reduxjs/toolkit";

export interface TimelineSlice {
  timelines: Timeline[];
  timelineBeingAdded: boolean;
  deleteTimelineConfirmDialogOpen: boolean;
  timelineToBeEdited: Timeline | null;
  timelineBeingRenamed: boolean;
}

const initialState: TimelineSlice = {
  timelines: [],
  timelineBeingAdded: false,
  deleteTimelineConfirmDialogOpen: false,
  timelineToBeEdited: null,
  timelineBeingRenamed: false,
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
    deleteTimeline: (state, action) => {
      state.timelines = state.timelines.filter((timeline) => {
        if (timeline.id === action.payload) return false;
        return true;
      });
    },
    toggleDeleteTimelineConfirmDialog: (state) => {
      state.deleteTimelineConfirmDialogOpen =
        !state.deleteTimelineConfirmDialogOpen;
    },
    setTimelineToBeEdited: (state, action) => {
      state.timelineToBeEdited = action.payload;
    },
    clearTimelineToBeEdited: (state) => {
      state.timelineToBeEdited = null;
    },
    toggleTimelineBeingRenamed: (state) => {
      state.timelineBeingRenamed = !state.timelineBeingRenamed;
    },
    renameTimeline: (state, action) => {
      if (!state.timelines) return;
      state.timelines = state.timelines.map((timeline) => {
        if (timeline.id === action.payload.id) {
          return {
            title: action.payload.title,
            id: timeline.id,
            scenes: timeline.scenes,
          };
        }
        return timeline;
      });
    },
  },
});

export const {
  toggleTimelineBeingAdded,
  addTimeline,
  setTimelines,
  deleteTimeline,
  toggleDeleteTimelineConfirmDialog,
  setTimelineToBeEdited,
  clearTimelineToBeEdited,
  toggleTimelineBeingRenamed,
  renameTimeline,
} = timelineSlice.actions;
export default timelineSlice.reducer;
