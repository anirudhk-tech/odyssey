import { Scene } from "@/app/types/scene";
import { Timeline } from "@/app/types/timeline";
import { createSlice } from "@reduxjs/toolkit";

export interface DndBooksSlice {
  scenesOrder: Scene[];
  activeDragScene: Scene | null;
  timelinesOrder: Timeline[];
  isSceneDraggingOut: boolean;
}

const initialState: DndBooksSlice = {
  scenesOrder: [],
  activeDragScene: null,
  timelinesOrder: [],
  isSceneDraggingOut: false,
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
  },
});

export const {
  setActiveDragScene,
  setScenesOrder,
  setTimelinesOrder,
  setIsSceneDraggingOut,
} = dndBooksSlice.actions;
export default dndBooksSlice.reducer;
