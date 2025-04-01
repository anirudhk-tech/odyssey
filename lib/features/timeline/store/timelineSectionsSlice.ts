import { TimelineSection } from "@/app/types/timeline";
import { createSlice } from "@reduxjs/toolkit";

export interface TimelineSectionsSlice {
  sections: TimelineSection[];
  addTimelineSectionDialogOpen: boolean;
}

const initialState: TimelineSectionsSlice = {
  sections: [],
  addTimelineSectionDialogOpen: false,
};

export const timelineSectionsSlice = createSlice({
  name: "timelineSections",
  initialState,
  reducers: {
    setTimelineSections: (state, action) => {
      state.sections = action.payload
        .slice()
        .sort((a: TimelineSection, b: TimelineSection) => a.xStart - b.xStart);
    },
    addTimelineSection: (state, action) => {
      state.sections.push(action.payload);
    },
    resizeTimelineSection: (state, action) => {
      state.sections = state.sections.map((section) => {
        if (section.id === action.payload.id) {
          return {
            ...section,
            xStart: action.payload.xStart,
            xEnd: action.payload.xEnd,
            width: action.payload.width,
          };
        }
        return section;
      });
    },
    toggleAddTimelineSectionDialog: (state) => {
      state.addTimelineSectionDialogOpen = !state.addTimelineSectionDialogOpen;
    },
  },
});

export const {
  setTimelineSections,
  addTimelineSection,
  resizeTimelineSection,
  toggleAddTimelineSectionDialog,
} = timelineSectionsSlice.actions;
export default timelineSectionsSlice.reducer;
