import { Scene } from "@/app/types/scene";
import { createSlice } from "@reduxjs/toolkit";

export interface ScenesSlice {
  scenes: Scene[] | null;
}

const initialState: ScenesSlice = {
  scenes: null,
};

export const scenesSlice = createSlice({
  name: "scenes",
  initialState,
  reducers: {
    addScene: (state, action) => {
      if (!state.scenes) return;
      state.scenes.push(action.payload);
    },
    setScenes: (state, action) => {
      state.scenes = action.payload;
    },
    deleteScene: (state, action) => {
      if (!state.scenes) return;
      state.scenes = state.scenes.filter(
        (scene) => scene.id !== action.payload
      );
    },
  },
});

export const { addScene, setScenes, deleteScene } = scenesSlice.actions;
export default scenesSlice.reducer;
