import { TimelineSection } from "@/app/types/timeline";
import { createSlice } from "@reduxjs/toolkit";

export interface TimelineSectionsSlice {
  sections: TimelineSection[];
  addTimelineSectionDialogOpen: boolean;
  timelineSectionToBeEdited: TimelineSection | null;
  deleteTimelineSectionConfirmDialogOpen: boolean;
  editTimelineSectionDialogOpen: boolean;
  sectionIsResizing: boolean;
}

const initialState: TimelineSectionsSlice = {
  sections: [],
  addTimelineSectionDialogOpen: false,
  timelineSectionToBeEdited: null,
  deleteTimelineSectionConfirmDialogOpen: false,
  editTimelineSectionDialogOpen: false,
  sectionIsResizing: false,
};

export const timelineSectionsSlice = createSlice({
  name: "timelineSections",
  initialState,
  reducers: {
    toggleSectionIsResizing: (state) => {
      state.sectionIsResizing = !state.sectionIsResizing;
    },
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
    setTimelineSectionToBeEdited: (state, action) => {
      state.timelineSectionToBeEdited = action.payload;
    },
    cleartimelineSectionToBeEdited: (state) => {
      state.timelineSectionToBeEdited = null;
    },
    toggleDeleteTimelineSectionConfirmDialog: (state) => {
      state.deleteTimelineSectionConfirmDialogOpen =
        !state.deleteTimelineSectionConfirmDialogOpen;
    },
    toggleEditTimelineSectionDialog: (state) => {
      state.editTimelineSectionDialogOpen =
        !state.editTimelineSectionDialogOpen;
    },
    editTimelineSection: (state, action) => {
      state.sections = state.sections.map((section) => {
        if (section.id === action.payload.id) {
          return {
            ...section,
            title: action.payload.title,
            color: action.payload.color,
          };
        }
        return section;
      });
    },
    deleteTimelineSection: (state, action) => {
      const deletedIndex = state.sections.findIndex(
        (section) => section.id === action.payload
      );

      if (deletedIndex === -1) return;

      const widthReduce = state.sections[deletedIndex].width;

      state.sections.forEach((section, idx) => {
        if (idx > deletedIndex) {
          section.xStart -= widthReduce;
          section.xEnd -= widthReduce;
        }
      });

      state.sections = state.sections.filter(
        (section) => section.id !== action.payload
      );
    },
    swapTimelineSections: (state, action) => {
      const sectionA = state.sections.find(
        (section) => section.id === action.payload.sectionAId
      );
      const sectionB = state.sections.find(
        (section) => section.id === action.payload.sectionBId
      );

      if (sectionA && sectionB) {
        const tempXStart = sectionA.xStart;
        const tempXEnd = sectionA.xEnd;

        sectionA.xStart = sectionB.xStart;
        sectionA.xEnd = sectionB.xEnd;

        sectionB.xStart = tempXStart;
        sectionB.xEnd = tempXEnd;
      }

      state.sections = state.sections.sort((a, b) => a.xStart - b.xStart);
    },
  },
});

export const {
  setTimelineSections,
  addTimelineSection,
  resizeTimelineSection,
  toggleAddTimelineSectionDialog,
  setTimelineSectionToBeEdited,
  cleartimelineSectionToBeEdited,
  toggleDeleteTimelineSectionConfirmDialog,
  toggleEditTimelineSectionDialog,
  editTimelineSection,
  deleteTimelineSection,
  swapTimelineSections,
  toggleSectionIsResizing,
} = timelineSectionsSlice.actions;
export default timelineSectionsSlice.reducer;
