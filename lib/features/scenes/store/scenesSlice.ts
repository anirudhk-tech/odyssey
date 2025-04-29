import { Scene } from "@/app/types/scene";
import { createSlice } from "@reduxjs/toolkit";

export interface ScenesSlice {
  scenes: Scene[] | null;
  searchedScenes: Scene[] | null;
  sceneQuery: string;
  sceneBeingAdded: boolean;
  deleteSceneConfirmDialogOpen: boolean;
  sceneBeingRenamed: boolean;
  sceneToBeEdited: Scene | null;
}

const initialState: ScenesSlice = {
  scenes: null,
  sceneQuery: "",
  searchedScenes: null,
  sceneBeingAdded: false,
  deleteSceneConfirmDialogOpen: false,
  sceneToBeEdited: null,
  sceneBeingRenamed: false,
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
    setSceneQuery: (state, action) => {
      state.sceneQuery = action.payload;
    },
    setSearchedScenes: (state, action) => {
      state.searchedScenes = action.payload;
    },
    deleteScene: (state, action) => {
      if (!state.scenes) return;
      state.scenes = state.scenes.filter(
        (scene) => scene.id !== action.payload
      );
    },
    toggleSceneBeingAdded: (state) => {
      state.sceneBeingAdded = !state.sceneBeingAdded;
    },
    toggleDeleteSceneConfirmDialog: (state) => {
      state.deleteSceneConfirmDialogOpen = !state.deleteSceneConfirmDialogOpen;
    },
    setSceneToBeEdited: (state, action) => {
      state.sceneToBeEdited = action.payload;
    },
    clearSceneToBeEdited: (state) => {
      state.sceneToBeEdited = null;
    },
    renameScene: (state, action) => {
      if (!state.scenes) return;
      state.scenes = state.scenes.map((scene) => {
        if (scene.id === action.payload.id) {
          return {
            ...scene,
            title: action.payload.title,
          };
        }
        return scene;
      });
    },
    toggleSceneBeingRenamed: (state) => {
      state.sceneBeingRenamed = !state.sceneBeingRenamed;
    },
    changeMultipleScenesColor: (state, action) => {
      if (!state.scenes || state.scenes === null) return;
      const changes = action.payload;
      changes.forEach((change: { id: string; color: string }) => {
        state.scenes = state.scenes
          ? state.scenes.map((scene) => {
              if (scene.id === change.id) {
                return {
                  ...scene,
                  color: change.color,
                };
              }
              return scene;
            })
          : null;
      });
    },
    swapScenesColor: (state, action) => {
      if (!state.scenes) return;
      const { colorOne, colorTwo } = action.payload;
      state.scenes = state.scenes.map((scene) => {
        if (scene.color === colorOne) {
          return { ...scene, color: colorTwo };
        } else if (scene.color === colorTwo) {
          return { ...scene, color: colorOne };
        }
        return scene;
      });
    },
    updateSceneTextCounts: (state, action) => {
      if (!state.scenes) return;
      const { id, wordCount, charCount } = action.payload;
      state.scenes = state.scenes.map((scene) => {
        if (scene.id === id) {
          return { ...scene, wordCount, charCount };
        }
        return scene;
      });
    },
  },
});

export const {
  addScene,
  setScenes,
  deleteScene,
  toggleSceneBeingAdded,
  toggleDeleteSceneConfirmDialog,
  setSceneToBeEdited,
  clearSceneToBeEdited,
  renameScene,
  toggleSceneBeingRenamed,
  setSearchedScenes,
  setSceneQuery,
  changeMultipleScenesColor,
  swapScenesColor,
  updateSceneTextCounts,
} = scenesSlice.actions;
export default scenesSlice.reducer;
