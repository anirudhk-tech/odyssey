import { NarrativeTimeline, Timeline } from "@/app/types/timeline";
import { createSlice } from "@reduxjs/toolkit";

export interface TimelineSlice {
  timelines: Timeline[];
  addTimelineDialogOpen: boolean;
  deleteTimelineConfirmDialogOpen: boolean;
  timelineToBeEdited: Timeline | null;
  timelineBeingRenamed: boolean;
  narrativeTimeline: NarrativeTimeline | null;
}

const initialState: TimelineSlice = {
  timelines: [],
  addTimelineDialogOpen: false,
  deleteTimelineConfirmDialogOpen: false,
  timelineToBeEdited: null,
  timelineBeingRenamed: false,
  narrativeTimeline: null,
};

export const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
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
    },
    clearScenesFromTimeline: (state, action) => {
      state.timelines[action.payload].scenes = [];
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
    },
    setNarrativeTimeline: (state, action) => {
      state.narrativeTimeline = action.payload;
    },
    addSceneToNarrativeTimeline: (state, action) => {
      if (!state.narrativeTimeline) return;
      state.narrativeTimeline = {
        ...state.narrativeTimeline,
        scenes: [...state.narrativeTimeline.scenes, action.payload],
      };
    },
    deleteSceneFromNarrativeTimeline: (state, action) => {
      if (!state.narrativeTimeline) return;
      state.narrativeTimeline.scenes = state.narrativeTimeline.scenes.filter(
        (scene) => scene.id !== action.payload
      );
    },
    clearScenesFromNarrativeTimeline: (state) => {
      if (!state.narrativeTimeline) return;
      state.narrativeTimeline.scenes = [];
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
    },
    changeMultipleSceneColorsOnTimelines: (state, action) => {
      const changes = action.payload;
      changes.forEach(
        ({ sceneId, color }: { sceneId: string; color: string | null }) => {
          state.timelines.forEach((timeline) => {
            timeline.scenes.forEach((scene) => {
              if (scene.id === sceneId) {
                scene.color = color;
              }
            });
          });
          if (state.narrativeTimeline) {
            const narrativeScene = state.narrativeTimeline.scenes.find(
              (scene) => scene.id === sceneId
            );
            if (narrativeScene) {
              narrativeScene.color = color;
            }
          }
        }
      );
    },
    changeSceneNameOnTimelines: (state, action) => {
      if (!state.timelines || !state.narrativeTimeline) return;
      const { title, sceneId } = action.payload;
      state.timelines.forEach((timeline) => {
        if (timeline.scenes) {
          timeline.scenes.forEach((scene) => {
            if (scene.id === sceneId) {
              scene.title = title;
            }
          });
        }
      });
      state.narrativeTimeline.scenes.find(
        (scene) => scene.id === sceneId
      )!.title = title;
    },
    swapTimelineScenesColor: (state, action) => {
      if (!state.timelines || !state.narrativeTimeline) return;
      const { colorOne, colorTwo } = action.payload;

      state.timelines.forEach((timeline) => {
        timeline.scenes.forEach((scene) => {
          if (scene.color === colorOne) {
            scene.color = colorTwo;
          } else if (scene.color === colorTwo) {
            scene.color = colorOne;
          }
        });
      });

      state.narrativeTimeline.scenes.forEach((scene) => {
        if (scene.color === colorOne) {
          scene.color = colorTwo;
        } else if (scene.color === colorTwo) {
          scene.color = colorOne;
        }
      });
    },
  },
});

export const {
  deleteSceneFromNarrativeTimeline,
  deleteSceneFromAllTimelines,
  changeMultipleSceneColorsOnTimelines,
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
  changeSceneNameOnTimelines,
  swapTimelineScenesColor,
  deleteSceneFromTimeline,
} = timelineSlice.actions;
export default timelineSlice.reducer;
