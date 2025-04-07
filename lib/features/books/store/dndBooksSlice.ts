import { PositionScene, Scene } from "@/app/types/scene";
import { Timeline } from "@/app/types/timeline";
import { createSlice } from "@reduxjs/toolkit";

export interface DndBooksSlice {
  scenesOrder: Scene[];
  activeDragScene: Scene | null;
  timelinesOrder: Timeline[];
  isSceneDraggingOut: boolean;
  timelinesScenesDict: Record<string, PositionScene[]>;
}

const initialState: DndBooksSlice = {
  scenesOrder: [],
  activeDragScene: null,
  timelinesOrder: [],
  isSceneDraggingOut: false,
  timelinesScenesDict: {},
};

export const dndBooksSlice = createSlice({
  name: "dndBooks",
  initialState,
  reducers: {
    setActiveDragScene: (state, action) => {
      state.activeDragScene = action.payload;
    },
    setIsSceneDraggingOut: (state, action) => {
      state.isSceneDraggingOut = action.payload;
    },
    setScenesOrder: (state, action) => {
      state.scenesOrder = action.payload;
    },
    setTimelinesOrder: (state, action) => {
      state.timelinesOrder = action.payload;
    },
    setTimelinesScenesDict: (state, action) => {
      state.timelinesScenesDict = action.payload;
    },
    addSceneToTimeline: (state, action) => {
      state.timelinesScenesDict[action.payload.timelineId].push(
        action.payload.scene
      );
    },
    clearScenesFromTimeline: (state, action) => {
      state.timelinesScenesDict[action.payload] = [];
    },
    changeScenePositionOnTimeline: (state, action) => {
      const { timelineId, sceneId, newPosition } = action.payload;
      const scenes = state.timelinesScenesDict[timelineId];
      const sceneIndex = scenes.findIndex((scene) => scene.id === sceneId);
      if (sceneIndex !== -1) {
        scenes[sceneIndex].x = newPosition;
      }
    },
  },
});

export const {
  setActiveDragScene,
  setScenesOrder,
  setTimelinesOrder,
  setIsSceneDraggingOut,
  addSceneToTimeline,
  setTimelinesScenesDict,
  changeScenePositionOnTimeline,
} = dndBooksSlice.actions;
export default dndBooksSlice.reducer;
