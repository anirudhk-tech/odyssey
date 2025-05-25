import { Scene } from "@/app/types/scene";
import { createSlice } from "@reduxjs/toolkit";

export interface ExportSlice {
  selectedScenes: {
    scene: Scene;
    order: number;
  }[];
  nextOrder: number;
}

export const initialState: ExportSlice = {
  selectedScenes: [],
  nextOrder: 1,
};

export const exportSlice = createSlice({
  name: "export",
  initialState,
  reducers: {
    setSelectedScenes: (state, action) => {
      state.selectedScenes = action.payload;
      state.nextOrder = action.payload.length + 1;
    },
    addSelectedScene: (state, action) => {
      state.selectedScenes.push({
        scene: action.payload,
        order: state.nextOrder,
      });

      state.nextOrder++;
    },
    removeSelectedScene: (state, action) => {
      const removed = state.selectedScenes.find(
        (selected) => selected.scene.id === action.payload.id
      );

      if (!removed) return;

      state.selectedScenes.forEach((selected) => {
        if (selected.order > removed.order) {
          selected.order--;
        }
      });

      state.selectedScenes = state.selectedScenes.filter(
        (selected) => selected.scene.id !== removed.scene.id
      );

      state.nextOrder = state.selectedScenes.length + 1;
    },
  },
});

export const { setSelectedScenes, addSelectedScene, removeSelectedScene } =
  exportSlice.actions;
export default exportSlice.reducer;
