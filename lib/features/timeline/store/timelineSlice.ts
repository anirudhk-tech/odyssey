import { NarrativeTimeline, Timeline } from "@/app/types/timeline";
import { calculateRightMostScenePositionOnTimelines } from "@/lib/utils/positionUtils";
import { createSlice } from "@reduxjs/toolkit";

export interface TimelineSlice {
  timelines: Timeline[];
  addTimelineDialogOpen: boolean;
  deleteTimelineConfirmDialogOpen: boolean;
  timelineToBeEdited: Timeline | null;
  timelineBeingRenamed: boolean;
  narrativeTimeline: NarrativeTimeline | null;
  rightMostScenePosition: number;
}

const initialState: TimelineSlice = {
  timelines: [],
  addTimelineDialogOpen: false,
  deleteTimelineConfirmDialogOpen: false,
  timelineToBeEdited: null,
  timelineBeingRenamed: false,
  narrativeTimeline: null,
  rightMostScenePosition: 0,
};

export const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    setRightMostScenePosition: (state, action) => {
      state.rightMostScenePosition = action.payload;
    },
    toggleAddTimelineDialog: (state) => {
      state.addTimelineDialogOpen = !state.addTimelineDialogOpen;
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

      calculateRightMostScenePositionOnTimelines(state);
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
    addSceneToTimeline: (state, action) => {
      state.timelines = state.timelines.map((timeline) => {
        if (timeline.id === action.payload.timelineId) {
          return {
            ...timeline,
            scenes: [...timeline.scenes, action.payload.scene],
          };
        }
        return timeline;
      });

      calculateRightMostScenePositionOnTimelines(state);
    },
    deleteSceneFromTimeline: (state, action) => {
      state.timelines = state.timelines.map((timeline) => {
        if (timeline.id === action.payload.timelineId) {
          return {
            ...timeline,
            scenes: timeline.scenes.filter(
              (scene) => scene.id !== action.payload.sceneId
            ),
          };
        }
        return timeline;
      });

      calculateRightMostScenePositionOnTimelines(state);
    },
    deleteSceneFromAllTimelines: (state, action) => {
      state.timelines = state.timelines.map((timeline) => {
        return {
          ...timeline,
          scenes: timeline.scenes.filter(
            (scene) => scene.id !== action.payload.sceneId
          ),
        };
      });

      if (state.narrativeTimeline) {
        state.narrativeTimeline.scenes = state.narrativeTimeline.scenes.filter(
          (scene) => scene.id !== action.payload.sceneId
        );
      }

      calculateRightMostScenePositionOnTimelines(state);
    },
    clearScenesFromTimeline: (state, action) => {
      state.timelines[action.payload].scenes = [];
      calculateRightMostScenePositionOnTimelines(state);
    },
    changeScenePositionOnTimeline: (state, action) => {
      const { timelineId, sceneId, newPosition } = action.payload;
      const newTimelines = state.timelines;
      const scenes =
        newTimelines.find((t) => t.id === timelineId)?.scenes || [];
      const sceneIndex = scenes.findIndex((scene) => scene.id === sceneId);
      if (sceneIndex !== -1) {
        scenes[sceneIndex].x = newPosition;
      }
      state.timelines = newTimelines;
      calculateRightMostScenePositionOnTimelines(state);
    },
    setNarrativeTimeline: (state, action) => {
      state.narrativeTimeline = action.payload;
      calculateRightMostScenePositionOnTimelines(state);
    },
    addSceneToNarrativeTimeline: (state, action) => {
      if (!state.narrativeTimeline) return;
      state.narrativeTimeline = {
        ...state.narrativeTimeline,
        scenes: [...state.narrativeTimeline.scenes, action.payload],
      };
      calculateRightMostScenePositionOnTimelines(state);
    },
    deleteSceneFromNarrativeTimeline: (state, action) => {
      if (!state.narrativeTimeline) return;
      state.narrativeTimeline.scenes = state.narrativeTimeline.scenes.filter(
        (scene) => scene.id !== action.payload
      );
      calculateRightMostScenePositionOnTimelines(state);
    },
    clearScenesFromNarrativeTimeline: (state) => {
      if (!state.narrativeTimeline) return;
      state.narrativeTimeline.scenes = [];
      calculateRightMostScenePositionOnTimelines(state);
    },
    changeScenePositionOnNarrativeTimeline: (state, action) => {
      if (!state.narrativeTimeline) return;

      const { sceneId, newPosition } = action.payload;
      const newScenes = state.narrativeTimeline.scenes;
      const sceneIndex = newScenes.findIndex((scene) => scene.id === sceneId);
      if (sceneIndex !== -1) {
        newScenes[sceneIndex].x = newPosition;
      }
      state.narrativeTimeline.scenes = newScenes;
      calculateRightMostScenePositionOnTimelines(state);
    },
  },
});

export const {
  deleteSceneFromNarrativeTimeline,
  deleteSceneFromAllTimelines,
  toggleAddTimelineDialog,
  addTimeline,
  setTimelines,
  deleteTimeline,
  toggleDeleteTimelineConfirmDialog,
  setTimelineToBeEdited,
  clearTimelineToBeEdited,
  toggleTimelineBeingRenamed,
  renameTimeline,
  addSceneToTimeline,
  clearScenesFromTimeline,
  changeScenePositionOnTimeline,
  setNarrativeTimeline,
  addSceneToNarrativeTimeline,
  clearScenesFromNarrativeTimeline,
  changeScenePositionOnNarrativeTimeline,
  deleteSceneFromTimeline,
  setRightMostScenePosition,
} = timelineSlice.actions;
export default timelineSlice.reducer;
